package com.mysite.sbb.Weather;

import com.mysite.sbb.errorstat.ErrorStatService;
import com.mysite.sbb.requeststat.RequestStatService;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.HashMap;

@RestController
@RequestMapping("/weather")
@RequiredArgsConstructor
public class WeatherController {
    private final WeatherService weatherService;
    private final RequestStatService requestStatService;
    private final ErrorStatService errorStatService;

    @PostMapping("/create")
    public ResponseEntity<Object> createWeather(@RequestBody WeatherDto weatherDto) {
        HashMap map = new HashMap<>();
        Weather preWhether = weatherService.findPreWeather(weatherDto);
        if (preWhether == null){
            Weather weather = this.weatherService.createWeather(weatherDto);
            if (weather == null) {
                map.put("status", 490);
            } else {
                map.put("status", 200);
            }
        }
        else{
            Weather weather = this.weatherService.changeWeather(preWhether, weatherDto);
            if (weather == null) {
                map.put("status", 490);
            } else {
                map.put("status", 200);
            }
        }
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @PostMapping("/get")
    ResponseEntity<Object> getWeather(@RequestBody WeatherDto weatherDto){
        Weather weather = weatherService.findPreWeather(weatherDto);
        HashMap map = new HashMap<>();
        if (weather == null) {
            map.put("status", 490);
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
        String latitude = weather.getLatitude();
        String longitude = weather.getLongitude();
        String urlstr = "http://api.openweathermap.org/data/2.5/weather?"
                + "lat="+latitude+"&lon="+longitude
                +"&appid=21f760621de430afbe03dfca1146bf7d";
        BufferedReader bf;
        String line, result = "";
        try {
            URL url = new URL(urlstr);
            bf = new BufferedReader(new InputStreamReader(url.openStream()));

            while((line=bf.readLine()) != null){
                result=result.concat(line);
            }

            JSONParser jsonParser = new JSONParser();
            JSONObject jsonObject = (JSONObject) jsonParser.parse(result);
//            String city = jsonObject.get("name").toString(); //도시이름
            String city = weather.getCity();

            JSONArray weatherArray = (JSONArray) jsonObject.get("weather");
            JSONObject obj = (JSONObject) weatherArray.get(0);
            String nowWeather =  obj.get("main").toString(); //날씨

            JSONObject mainArray = (JSONObject) jsonObject.get("main");
            double ktemp = Double.parseDouble((mainArray.get("temp").toString()));
            String temp = String.format("%.1f", ktemp - 273.15);

            map.put("status", 200);
            map.put("city", city);
            map.put("nowWeather", nowWeather);
            map.put("temp", temp);

            //통계추가
            requestStatService.increaseWeatherCount(weatherDto.getUserId());

        }
        catch (Exception e){
            map.put("status", 490);
            errorStatService.increaseWeatherCount(weatherDto.getUserId());
        }
        return new ResponseEntity<>(map, HttpStatus.OK);
    }
}
