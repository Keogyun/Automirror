package com.mysite.sbb.Weather;

import com.mysite.sbb.appuser.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WeatherRepository extends JpaRepository<Weather, Long> {
    Weather findByAppUser(AppUser appUser);
}
