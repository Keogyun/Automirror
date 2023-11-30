package com.mysite.sbb.appuser;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {

    AppUser findByUserId(String userId);
    AppUser findByUserIdAndUserPassword(String userId, String userPassword);
    AppUser findByNameAndEmail(String name, String email);
    AppUser findByUserIdAndNameAndEmail(String userId, String name, String email);
    AppUser findByUserIndex(long userIndex);
    Page<AppUser> findAll(Pageable pageable);
    Page<AppUser> findAll(Specification<AppUser> specification, Pageable pageable);

}
