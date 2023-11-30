package com.mysite.sbb.requeststat;

import com.mysite.sbb.appuser.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestStatRepository extends JpaRepository<RequestStat, Long> {
    RequestStat findByAppUser(AppUser appUser);
}
