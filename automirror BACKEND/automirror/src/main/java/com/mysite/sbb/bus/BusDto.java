package com.mysite.sbb.bus;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BusDto {
    private String stationId;
    private String stationName;
    private String stationOrder;
    private String routeId;
    private String routeName;
    private String userId;
}
