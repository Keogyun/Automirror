package com.mysite.sbb.device;

import com.mysite.sbb.connection.Connection;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Device {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long deviceIndex;

    @Column(nullable = false)
    private String deviceId;

    @Column(nullable = false)
    private String deviceAddress;

    private String ifUse;

    @OneToOne(mappedBy = "device", cascade = CascadeType.REMOVE)
    private Connection connection;

}
