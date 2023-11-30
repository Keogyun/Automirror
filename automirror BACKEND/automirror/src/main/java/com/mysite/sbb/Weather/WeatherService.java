package com.mysite.sbb.Weather;

import com.mysite.sbb.appuser.AppUserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class WeatherService {

    private final AppUserRepository appUserRepository;
    private final WeatherRepository weatherRepository;

    public Weather createWeather(WeatherDto weatherDto){
        Weather weather = new Weather();
        weather.setLatitude(weatherDto.getLatitude());
        weather.setLongitude(weatherDto.getLongitude());
        weather.setCity(weatherDto.getCity());
        weather.setAppUser(appUserRepository.findByUserId(weatherDto.getUserId()));
        Weather saveWeather = this.weatherRepository.save(weather);
        return saveWeather;
    }

    public Weather changeWeather(Weather weather, WeatherDto weatherDto){
        weather.setLatitude(weatherDto.getLatitude());
        weather.setLongitude(weatherDto.getLongitude());
        weather.setCity(weatherDto.getCity());
        Weather saveWeather = this.weatherRepository.save(weather);
        return saveWeather;
    }

    public Weather findPreWeather(WeatherDto weatherDto){
        Weather preWeather = this.weatherRepository.findByAppUser(appUserRepository.findByUserId(weatherDto.getUserId()));
        return preWeather;
    }
}
