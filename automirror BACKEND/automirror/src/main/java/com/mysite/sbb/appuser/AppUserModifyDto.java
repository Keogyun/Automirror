package com.mysite.sbb.appuser;

import lombok.Data;

@Data
public class AppUserModifyDto {
    private Long userIndex;
    private String msg;
    private String userId;
    private String email;
    private String name;
}
