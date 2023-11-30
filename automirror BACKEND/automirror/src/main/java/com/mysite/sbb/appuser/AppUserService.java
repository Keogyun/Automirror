package com.mysite.sbb.appuser;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AppUserService {

    private final AppUserRepository appUserRepository;

    public AppUser createAppUser(AppUserDto appUserDto){
        AppUser appUser = new AppUser();
        AppUser savedAppUser = new AppUser();
        appUser.setUserId(appUserDto.getUserId());
        appUser.setUserPassword(appUserDto.getUserPassword());
        appUser.setName(appUserDto.getName());
        appUser.setEmail(appUserDto.getEmail());
        appUser.setWeatherGesture("미등록");
        appUser.setBusGesture("미등록");
        appUser.setTodoGesture("미등록");
        appUser.setNewsGesture("미등록");
        this.appUserRepository.save(appUser);
        return savedAppUser;
    }

//    public AppUser getAppUserInfo(String user_id){
//        AppUser appUser = appUserRepository.findByUser_id(user_id);
//        return appUser;
//    }

    public String getAppUserId(long userIndex){
        AppUser appUser = appUserRepository.findByUserIndex(userIndex);
        return appUser.getUserId();
    }

    public AppUser getAppUser(String userId){
        AppUser appUser = appUserRepository.findByUserId(userId);
        return appUser;
    }

    public AppUser getAppUser(Long id){
        AppUser appUser = appUserRepository.findByUserIndex(id);
        return appUser;
    }

    public boolean getUserCan(String user_id){
        AppUser appUser = this.appUserRepository.findByUserId(user_id);
        if (appUser == null){
            return true;
        }
        else{
            return false;
        }
    }

    public AppUser login(AppUserDto appUserDto){
        AppUser appUser = this.appUserRepository.findByUserIdAndUserPassword(appUserDto.getUserId(), appUserDto.getUserPassword());
        return appUser;

    }

    public AppUser findId(AppUserDto appUserDto){
        AppUser appUser = this.appUserRepository.findByNameAndEmail(appUserDto.getName(), appUserDto.getEmail());
        return appUser;
    }

    public AppUser findPw(AppUserDto appUserDto){
        AppUser appUser = this.appUserRepository.findByUserIdAndNameAndEmail(appUserDto.getUserId(), appUserDto.getName(), appUserDto.getEmail());
        return appUser;
    }

    public void changePw(AppUser appUser, String password){
        appUser.setUserPassword(password);
        this.appUserRepository.save(appUser);
    }

    public AppUser findInfo(AppUserDto appUserDto){
        AppUser appUser = this.appUserRepository.findByUserId(appUserDto.getUserId());
        return appUser;
    }

    public void changeUserInfo(AppUser appUser, AppUserDto appUserDto ){
        appUser.setUserPassword(appUserDto.getUserPassword());
        appUser.setName(appUserDto.getName());
        appUser.setEmail(appUserDto.getEmail());
        this.appUserRepository.save(appUser);
    }

    public void changeUserInfoWeb(AppUser appUser, AppUserModifyDto appUserModifyDto){
        appUser.setName(appUserModifyDto.getName());
        appUser.setEmail(appUserModifyDto.getEmail());
        this.appUserRepository.save(appUser);
    }

    public AppUser findByUserIndex(long userIndex){
        AppUser appUser = this.appUserRepository.findByUserIndex(userIndex);
        return appUser;
    }

    public void deleteUser(AppUser appUser){
        this.appUserRepository.delete(appUser);
    }

    public List<AppUser> getList() { return this.appUserRepository.findAll(); }

    public Page<AppUser> getList(int page, String kw) {
        Pageable pageable = PageRequest.of(page, 10);
        Specification<AppUser> spec = search(kw);
        return this.appUserRepository.findAll(spec, pageable);
    }

    private Specification<AppUser> search(String kw){
        return new Specification<>() {
            private static final long serialVersionUID = 1L;
            @Override
            public Predicate toPredicate(Root<AppUser> appUser, CriteriaQuery<?> query, CriteriaBuilder cb){
                query.distinct(true);
                return cb.or(cb.like(appUser.get("userId"), "%" + kw + "%"),
                        cb.like(appUser.get("name"), "%" + kw + "%"),
                        cb.like(appUser.get("email"), "%" + kw + "%"));
            }
        };
    }
    public AppUser findByUserId(String userId){
        AppUser appUser = this.appUserRepository.findByUserId(userId);
        return appUser;
    }

    public void addWeatherGesture(AppUser appUser){
        appUser.setWeatherGesture("등록");
        appUserRepository.save(appUser);
    }
    public void addBusGesture(AppUser appUser){
        appUser.setBusGesture("등록");
        appUserRepository.save(appUser);
    }
    public void addTodoGesture(AppUser appUser){
        appUser.setTodoGesture("등록");
        appUserRepository.save(appUser);
    }
    public void addNewsGesture(AppUser appUser){
        appUser.setNewsGesture("등록");
        appUserRepository.save(appUser);
    }
}
