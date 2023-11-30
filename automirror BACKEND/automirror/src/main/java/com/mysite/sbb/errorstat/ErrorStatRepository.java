package com.mysite.sbb.errorstat;

import com.mysite.sbb.appuser.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ErrorStatRepository extends JpaRepository<ErrorStat, Long> {
    ErrorStat findByAppUser(AppUser appUser);
}
