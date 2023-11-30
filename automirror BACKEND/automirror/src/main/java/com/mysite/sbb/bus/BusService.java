package com.mysite.sbb.bus;

import com.mysite.sbb.appuser.AppUserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class BusService {

    private final AppUserRepository appUserRepository;
    private final BusRepository busRepository;

    public Bus createBus(BusDto busDto){
        Bus bus = new Bus();
        bus.setRouteId(busDto.getRouteId());
        bus.setRouteName(busDto.getRouteName());
        bus.setStationId(busDto.getStationId());
        bus.setStationName(busDto.getStationName());
        bus.setStationOrder(busDto.getStationOrder());
        bus.setAppUser(appUserRepository.findByUserId(busDto.getUserId()));
        this.busRepository.save(bus);
        return bus;
    }

    public Bus changeBus(Bus bus, BusDto busDto){
        bus.setRouteId(busDto.getRouteId());
        bus.setRouteName(busDto.getRouteName());
        bus.setStationId(busDto.getStationId());
        bus.setStationName(busDto.getStationName());
        bus.setStationOrder(busDto.getStationOrder());
        this.busRepository.save(bus);
        return bus;
    }

    public Bus findBus(BusDto busDto){
        Bus preBus = this.busRepository.findByAppUser(appUserRepository.findByUserId(busDto.getUserId()));
        return preBus;
    }
}
