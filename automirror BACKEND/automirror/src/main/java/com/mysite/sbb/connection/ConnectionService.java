package com.mysite.sbb.connection;

import com.mysite.sbb.appuser.AppUserRepository;
import com.mysite.sbb.device.DeviceRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class ConnectionService {
    private final ConnectionRepository connectionRepository;
    private final AppUserRepository appUserRepository;
    private final DeviceRepository deviceRepository;

    public void createConnection(String userId, String deviceAddress){
        Connection connection = new Connection();
        connection.setAppUser(appUserRepository.findByUserId(userId));
        connection.setDevice(deviceRepository.findByDeviceAddress(deviceAddress));
        this.connectionRepository.save(connection);
    }

    public Connection getConnection(String userId){
        Connection connection = this.connectionRepository.findByAppUser(appUserRepository.findByUserId(userId));
        return connection;
    }

    public void changeConnection(Connection connection, String deviceAddress){
        connection.setDevice(deviceRepository.findByDeviceAddress(deviceAddress));
        this.connectionRepository.save(connection);
    }
}
