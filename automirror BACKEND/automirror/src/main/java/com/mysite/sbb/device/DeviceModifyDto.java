package com.mysite.sbb.device;

import lombok.Data;

@Data
public class DeviceModifyDto {
    private Long deviceIndex;
    private String deviceId;
    private String deviceAddress;
}
