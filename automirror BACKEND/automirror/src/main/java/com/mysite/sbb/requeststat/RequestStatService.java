package com.mysite.sbb.requeststat;

import com.mysite.sbb.appuser.AppUserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class RequestStatService {
    private final AppUserRepository appUserRepository;
    private final RequestStatRepository requestStatRepository;

    public void createRequestStat(String userId){
        RequestStat requestStat = new RequestStat();
        requestStat.setAppUser(appUserRepository.findByUserId(userId));
        requestStat.setNewsCount(0);
        requestStat.setBusCount(0);
        requestStat.setWeatherCount(0);
        requestStat.setTodoCount(0);
        this.requestStatRepository.save(requestStat);
    }

    public RequestStat getRequestStat(Long userIndex){
        RequestStat requestStat = this.requestStatRepository.findByAppUser(appUserRepository.findByUserIndex(userIndex));
        return requestStat;
    }

    public void increaseNewsCount(String userId){
        RequestStat requestStat = this.requestStatRepository.findByAppUser(appUserRepository.findByUserId(userId));
        long preCount = requestStat.getNewsCount();
        requestStat.setNewsCount(preCount + 1);
        this.requestStatRepository.save(requestStat);
    }

    public void increaseBusCount(String userId){
        RequestStat requestStat = this.requestStatRepository.findByAppUser(appUserRepository.findByUserId(userId));
        long preCount = requestStat.getBusCount();
        requestStat.setBusCount(preCount + 1);
        this.requestStatRepository.save(requestStat);
    }

    public void increaseWeatherCount(String userId){
        RequestStat requestStat = this.requestStatRepository.findByAppUser(appUserRepository.findByUserId(userId));
        long preCount = requestStat.getWeatherCount();
        requestStat.setWeatherCount(preCount + 1);
        this.requestStatRepository.save(requestStat);
    }

    public void increaseTodoCount(String userId){
        RequestStat requestStat = this.requestStatRepository.findByAppUser(appUserRepository.findByUserId(userId));
        long preCount = requestStat.getTodoCount();
        requestStat.setTodoCount(preCount + 1);
        this.requestStatRepository.save(requestStat);
    }
}
