package com.mysite.sbb.bus;

import com.mysite.sbb.appuser.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusRepository extends JpaRepository<Bus, Long> {
    Bus findByAppUser(AppUser appUser);
}
