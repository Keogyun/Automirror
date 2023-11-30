package com.mysite.sbb.bus;

import com.mysite.sbb.appuser.AppUser;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Bus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long busIndex;

    @Column(nullable = false)
    private String stationId;

    @Column(nullable = false)
    private String stationName;

    @Column(nullable = false)
    private String routeId;

    @Column(nullable = false)
    private String routeName;

    @Column(nullable = false)
    private String stationOrder;

    @OneToOne
    private AppUser appUser;



}
