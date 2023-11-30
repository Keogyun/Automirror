package com.mysite.sbb.user;

import lombok.Data;

@Data
public class FindPwDto {
    private String username;
    private String email;
    private String password;
}
