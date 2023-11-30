package com.mysite.sbb.connection;

import com.mysite.sbb.appuser.AppUser;
import com.mysite.sbb.device.Device;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Connection {
    @Id
    @GeneratedValue
    private long connectionIndex;

    @OneToOne
    private AppUser appUser;

    @OneToOne
    private Device device;
}
