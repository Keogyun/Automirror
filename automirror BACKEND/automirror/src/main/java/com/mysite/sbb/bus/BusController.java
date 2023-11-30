package com.mysite.sbb.bus;

import com.mysite.sbb.errorstat.ErrorStatService;
import com.mysite.sbb.requeststat.RequestStatService;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.XML;
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
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/bus")
@RequiredArgsConstructor
public class BusController {
    private final BusService busService;
    private final RequestStatService requestStatService;
    private final ErrorStatService errorStatService;

    @PostMapping("/create")
    public ResponseEntity<Object> createBus(@RequestBody BusDto busDto){
        HashMap map = new HashMap<>();
        Bus preBus = busService.findBus(busDto);
        if (preBus == null){
            Bus bus = this.busService.createBus(busDto);
            if (bus == null){
                map.put("status", 490);
            } else {
                map.put("status", 200);
            }
        }
        else{
            Bus bus = busService.changeBus(preBus, busDto);
            if (bus == null){
                map.put("status", 490);
            } else {
                map.put("status", 200);
            }
        }
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @PostMapping("/getBus")
    ResponseEntity<Object> getBus(@RequestBody Map<String, String> busNumMap){
        HashMap map = new HashMap<>();
        String busNum = busNumMap.get("busNum");
        String encodeKey = "NyO4YTyH2X4t%2B45P7KqyFI%2FUd5Wh2qQtwP0Mp%2BQtqmhu2v5OJhqfLg16qHQj2QHYtUxm%2BLTQMmFJPLOAJBq%2B2Q%3D%3D"; //api 인증키
        String urlstr = "http://apis.data.go.kr/6410000/busrouteservice/getBusRouteList?serviceKey="
                + encodeKey + "&keyword=" + busNum;

        BufferedReader bf;
        StringBuilder sb = new StringBuilder();
        String line;

        try {
            URL url = new URL(urlstr);
            bf = new BufferedReader(new InputStreamReader(url.openStream()));

            while((line=bf.readLine()) != null){
                sb.append(line);
            }

            JSONObject jsonObject = XML.toJSONObject(sb.toString());
            JSONObject bodyObject1 = (JSONObject) jsonObject.get("response");
            JSONObject bodyObject2 = (JSONObject) bodyObject1.get("msgBody");
            JSONArray bodyObject3 = (JSONArray) bodyObject2.get("busRouteList");
            List<Object> list = bodyObject3.toList();
            map.put("status", 200);
            map.put("busRouteList", list);
            return new ResponseEntity<>(map, HttpStatus.OK);

        }
        catch (Exception e){
            map.put("status", 490);
            System.out.println(e);
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @PostMapping("/getStation")
    ResponseEntity<Object> getStation(@RequestBody Map<String, String> busIdMap){
        HashMap map = new HashMap<>();
        String busId = busIdMap.get("busId");
        String encodeKey = "NyO4YTyH2X4t%2B45P7KqyFI%2FUd5Wh2qQtwP0Mp%2BQtqmhu2v5OJhqfLg16qHQj2QHYtUxm%2BLTQMmFJPLOAJBq%2B2Q%3D%3D"; //api 인증키
        String urlstr = "http://apis.data.go.kr/6410000/busrouteservice/getBusRouteStationList?serviceKey="
                + encodeKey + "&routeId=" + busId;

        BufferedReader bf;
        StringBuilder sb = new StringBuilder();
        String line;

        try {
            URL url = new URL(urlstr);
            bf = new BufferedReader(new InputStreamReader(url.openStream()));

            while((line=bf.readLine()) != null){
                sb.append(line);
            }

            JSONObject jsonObject = XML.toJSONObject(sb.toString());
            JSONObject bodyObject1 = (JSONObject) jsonObject.get("response");
            JSONObject bodyObject2 = (JSONObject) bodyObject1.get("msgBody");
            JSONArray bodyObject3 = (JSONArray) bodyObject2.get("busRouteStationList");
            List<Object> list = bodyObject3.toList();
            map.put("status", 200);
            map.put("busRouteStationList", list);
            return new ResponseEntity<>(map, HttpStatus.OK);

        }
        catch (Exception e){
            map.put("status", 490);
            System.out.println(e);
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @PostMapping("/getArrival")
    ResponseEntity<Object> getBusArrival(@RequestBody BusDto busDto){
        Bus bus = busService.findBus(busDto);
        HashMap map = new HashMap<>();
        if (bus == null) {
            map.put("status", 490);
            errorStatService.increaseBusCount(busDto.getUserId()); //통계추가

            return new ResponseEntity<>(map, HttpStatus.OK);

        }
        String stationId = bus.getStationId();
        String routeId = bus.getRouteId();
        String staOrder = bus.getStationOrder();

        String encodeKey = "NyO4YTyH2X4t%2B45P7KqyFI%2FUd5Wh2qQtwP0Mp%2BQtqmhu2v5OJhqfLg16qHQj2QHYtUxm%2BLTQMmFJPLOAJBq%2B2Q%3D%3D"; //api 인증키
        String urlstr = "http://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalItem?serviceKey="
                + encodeKey + "&stationId=" + stationId + "&routeId=" + routeId + "&staOrder=" + staOrder;

        BufferedReader bf;
        StringBuilder sb = new StringBuilder();
        String line;

        try {
            URL url = new URL(urlstr);
            bf = new BufferedReader(new InputStreamReader(url.openStream()));

            while((line=bf.readLine()) != null){
                sb.append(line);
            }

            JSONObject jsonObject = XML.toJSONObject(sb.toString());
            JSONObject bodyObject1 = (JSONObject) jsonObject.get("response");
            System.out.println(bodyObject1);
            JSONObject bodyObject2 = (JSONObject) bodyObject1.get("msgBody");
            JSONObject bodyObject3 = (JSONObject) bodyObject2.get("busArrivalItem");

            String predictTime = bodyObject3.get("predictTime1").toString();
            map.put("status",200);
            map.put("stationName", bus.getStationName());
            map.put("routeName", bus.getRouteName());
            map.put("predictTime", predictTime);

            //통계추가
            requestStatService.increaseBusCount(busDto.getUserId());

        }
        catch (Exception e){
            map.put("status", 490);
            System.out.println(e);
            errorStatService.increaseBusCount(busDto.getUserId()); //통계추가

        }
        return new ResponseEntity<>(map, HttpStatus.OK);
    }
}
