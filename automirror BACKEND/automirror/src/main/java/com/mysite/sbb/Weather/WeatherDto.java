package com.mysite.sbb.Weather;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class WeatherDto {
    private String longitude;
    private String latitude;
    private String city;
    private String userId;
}
