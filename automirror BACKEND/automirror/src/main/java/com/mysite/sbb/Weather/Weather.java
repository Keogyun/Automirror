package com.mysite.sbb.Weather;

import com.mysite.sbb.appuser.AppUser;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Weather {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long weatherIndex;

    @Column(nullable = false)
    private String longitude;

    @Column(nullable = false)
    private String latitude;

    @Column(nullable = false)
    private String city;

    @OneToOne
    private AppUser appUser;

}
