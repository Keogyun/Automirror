package com.mysite.sbb.errorstat;

import com.mysite.sbb.appuser.AppUserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class ErrorStatService {
    private final AppUserRepository appUserRepository;
    private final ErrorStatRepository errorStatRepository;

    public void createErrorStat(String userId){
        ErrorStat errorStat = new ErrorStat();
        errorStat.setAppUser(appUserRepository.findByUserId(userId));
        errorStat.setNewsCount(0);
        errorStat.setBusCount(0);
        errorStat.setWeatherCount(0);
        errorStat.setTodoCount(0);
        this.errorStatRepository.save(errorStat);
    }

    public ErrorStat getErrorStat(Long userIndex){
        ErrorStat errorStat = this.errorStatRepository.findByAppUser(appUserRepository.findByUserIndex(userIndex));
        return errorStat;
    }

    public void increaseNewsCount(String userId){
        ErrorStat errorStat = this.errorStatRepository.findByAppUser(appUserRepository.findByUserId(userId));
        long preCount = errorStat.getNewsCount();
        errorStat.setNewsCount(preCount + 1);
        this.errorStatRepository.save(errorStat);
    }

    public void increaseBusCount(String userId){
        ErrorStat errorStat = this.errorStatRepository.findByAppUser(appUserRepository.findByUserId(userId));
        long preCount = errorStat.getBusCount();
        errorStat.setBusCount(preCount + 1);
        this.errorStatRepository.save(errorStat);
    }

    public void increaseWeatherCount(String userId){
        ErrorStat errorStat = this.errorStatRepository.findByAppUser(appUserRepository.findByUserId(userId));
        long preCount = errorStat.getWeatherCount();
        errorStat.setWeatherCount(preCount + 1);
        this.errorStatRepository.save(errorStat);
    }

    public void increaseTodoCount(String userId){
        ErrorStat errorStat = this.errorStatRepository.findByAppUser(appUserRepository.findByUserId(userId));
        long preCount = errorStat.getTodoCount();
        errorStat.setTodoCount(preCount + 1);
        this.errorStatRepository.save(errorStat);
    }
}
