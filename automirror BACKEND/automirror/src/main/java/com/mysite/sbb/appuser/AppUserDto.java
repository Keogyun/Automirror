package com.mysite.sbb.appuser;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AppUserDto {
    private String userId;
    private String userPassword;
    private String name;
    private String email;
}
