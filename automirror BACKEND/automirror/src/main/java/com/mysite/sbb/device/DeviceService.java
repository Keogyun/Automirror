package com.mysite.sbb.device;

import com.mysite.sbb.DataNotFoundException;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class DeviceService {
    private final DeviceRepository deviceRepository;

    public List<Device> getList() {
        return this.deviceRepository.findAll();
    }

    public Page<Device> getList(int page, String kw) {
        Pageable pageable = PageRequest.of(page, 10);
        Specification<Device> spec = search(kw);
        return this.deviceRepository.findAll(spec, pageable);
    }

    public Device getDevice(Long deviceIndex){
        Optional<Device> device = this.deviceRepository.findByDeviceIndex(deviceIndex);
        if (device.isPresent()){
            return device.get();
        }
        else{
            throw new DataNotFoundException("device not found");
        }
    }

    public Device getDeviceByDeviceAddress(String deviceAddress){
        Device device = this.deviceRepository.findByDeviceAddress(deviceAddress);
        return device;
    }

    public void create(String deviceId, String deviceAddress){
        Device d = new Device();
        d.setDeviceId(deviceId);
        d.setDeviceAddress(deviceAddress);
        d.setIfUse("미개통");
        this.deviceRepository.save(d);
    }

    public String findDeviceAddress(String deviceId){
        Device device = this.deviceRepository.findByDeviceId(deviceId);
        return device.getDeviceAddress();
    }

    public void changeDeviceInfoWeb(Device device, DeviceModifyDto deviceModifyDto){
        device.setDeviceId(deviceModifyDto.getDeviceId());
        device.setDeviceAddress(deviceModifyDto.getDeviceAddress());
        this.deviceRepository.save(device);
    }

    public void changeDeviceStatusUse(Device device){
        device.setIfUse("개통");
        this.deviceRepository.save(device);
    }

    public void delete(Device device){
        this.deviceRepository.delete(device);
    }

    private Specification<Device> search(String kw){
        return new Specification<>(){
            private static final long serialVersionUID = 1L;
            @Override
            public Predicate toPredicate(Root<Device> device, CriteriaQuery<?> query, CriteriaBuilder cb){
                query.distinct(true);
                return cb.or(cb.like(device.get("deviceId") , "%" + kw + "%"),
                        cb.like(device.get("deviceAddress"), "%" + kw + "%"));
            }
        };
    }
}
