package com.mysite.sbb.device;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DeviceRepository extends JpaRepository<Device, Long> {
    Optional<Device> findByDeviceIndex(Long deviceIndex);
    Page<Device> findAll(Pageable pageable);

    Device findByDeviceId(String deviceId);

    Device findByDeviceAddress(String deviceAddress);

    Page<Device> findAll(Specification<Device> spec, Pageable pageable);
}
