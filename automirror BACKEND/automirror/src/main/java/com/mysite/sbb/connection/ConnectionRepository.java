package com.mysite.sbb.connection;

import com.mysite.sbb.appuser.AppUser;
import com.mysite.sbb.device.Device;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConnectionRepository extends JpaRepository<Connection, Long> {

    Connection findByAppUser(AppUser appUser);
    Connection findByDevice(Device device);
}
