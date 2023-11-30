package com.mysite.sbb.appuser;

import com.mysite.sbb.connection.Connection;
import com.mysite.sbb.connection.ConnectionService;
import com.mysite.sbb.device.Device;
import com.mysite.sbb.device.DeviceService;
import com.mysite.sbb.errorstat.ErrorStatService;
import com.mysite.sbb.requeststat.RequestStatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class AppUserController {
    private final AppUserService appUserService;
    private final RequestStatService requestStatService;
    private final ErrorStatService errorStatService;
    private final ConnectionService connectionService;
    private final DeviceService deviceService;

    @PostMapping("/member-available")
    public String memberCanUse(@RequestBody AppUserDto appUserDto){
    boolean n = appUserService.getUserCan(appUserDto.getUserId());
    if (n==true){
        return "OK";
    }
    else{
        return "NO";
    }
    }

    @PostMapping("/member-info")
    public String createUser(@RequestBody AppUserDto appUserDto){
        AppUser appUser = appUserService.createAppUser(appUserDto);
        requestStatService.createRequestStat(appUserDto.getUserId());
        errorStatService.createErrorStat(appUserDto.getUserId());
        return "OK";
    }

    @PostMapping("/login")
    public ResponseEntity<Object> memberLogin(@RequestBody AppUserDto appUserDto){
        AppUser appUser = appUserService.login(appUserDto);
        HashMap map = new HashMap<>();

        if (appUser == null){
            map.put("status", 490);
            map.put("errorMessage", "There is no correct id and password.");
        }
        else{
            map.put("status", 200);
            map.put("userId", appUser.getUserId());
            map.put("userPassword", appUser.getUserPassword());
            map.put("name", appUser.getName());
            map.put("email", appUser.getEmail());
            Connection preConnection =  connectionService.getConnection(appUser.getUserId());
            if (preConnection == null){
                map.put("deviceAddress", null);
            }
            else {
                map.put("deviceAddress", preConnection.getDevice().getDeviceAddress());
            }
        }

        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @PostMapping("/find-id")
    public ResponseEntity<Object> findId(@RequestBody AppUserDto appUserDto){
        AppUser appUser = appUserService.findId(appUserDto);
        HashMap map = new HashMap<>();

        if(appUser == null){
            map.put("status", 490);
            map.put("errorMessage", "There is no correct name and email.");
        }
        else{
            map.put("status", 200);
            map.put("userId", appUser.getUserId());
        }

        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @PostMapping("/find-pw")
    public ResponseEntity<Object> findPw(@RequestBody AppUserDto appUserDto){
        AppUser appUser = appUserService.findPw(appUserDto);
        HashMap map = new HashMap<>();

        if(appUser == null){
            map.put("status", 490);
            map.put("errorMessage", "There is no correct id and name and email.");
        }
        else{
            map.put("status", 200);
        }
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @PutMapping("/find-pw")
    public ResponseEntity<Object> changePw(@RequestBody AppUserDto appUserDto){
        AppUser appUser = appUserService.findPw(appUserDto);
        HashMap map = new HashMap<>();
        if(appUser == null){
            map.put("status", 490);
            map.put("errorMessage", "There is no correct id and name and email.");
        }
        else{
            this.appUserService.changePw(appUser, appUserDto.getUserPassword());
            map.put("status", 200);
        }
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @PostMapping("/change-info")
    public ResponseEntity<Object> findInfo(@RequestBody AppUserDto appUserDto){
        AppUser appUser = appUserService.login(appUserDto);
        HashMap map = new HashMap<>();

        if (appUser == null){
            map.put("status", 490);
            map.put("errorMessage", "There is no correct password.");
        }
        else{
            map.put("status", 200);
            map.put("userId", appUser.getUserId());
            map.put("userPassword", appUser.getUserPassword());
            map.put("name", appUser.getName());
            map.put("email", appUser.getEmail());
        }

        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @PutMapping("/change-info")
    public ResponseEntity<Object> changeInfo(@RequestBody AppUserDto appUserDto){
        AppUser appUser = appUserService.findInfo(appUserDto);
        HashMap map = new HashMap<>();
        if(appUser == null){
            map.put("status", 490);
            map.put("errorMessage", "There is no correct id.");
        }
        else{
            this.appUserService.changeUserInfo(appUser, appUserDto);
            map.put("status", 200);
        }
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Object> deleteUser(@RequestBody AppUserDto appUserDto){
        AppUser appUser = appUserService.login(appUserDto);
        HashMap map = new HashMap<>();
        if(appUser == null){
            map.put("status", 490);
            map.put("errorMessage", "There is no correct password.");
        }
        else{
            this.appUserService.deleteUser(appUser);
            map.put("status", 200);
        }
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @PostMapping("/create-connection")
    public ResponseEntity<Object> addConnection(@RequestBody Map<String, String> idMap ){
        HashMap map = new HashMap<>();
        String userId = idMap.get("userId");
        String deviceAddress = idMap.get("deviceAddress");
        AppUser appUser = appUserService.getAppUser(userId);
        Device device = deviceService.getDeviceByDeviceAddress(deviceAddress);
        if (appUser == null || device == null){
            map.put("status", 490);
            return new ResponseEntity<>(map, HttpStatus.OK);
        }

        Connection preConnection = connectionService.getConnection(userId);
        if (preConnection == null){
            connectionService.createConnection(userId, deviceAddress);
            deviceService.changeDeviceStatusUse(device);
            map.put("status", 200);
        }
        else{
            connectionService.changeConnection(preConnection, deviceAddress);
            deviceService.changeDeviceStatusUse(device);
            map.put("status", 200);
        }

        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @PostMapping("/add-gesture")
    public ResponseEntity<Object> addGesture(@RequestBody Map<String, String> idMap ){
        HashMap map = new HashMap<>();
        String userId = idMap.get("userId");
        String gestureName = idMap.get("gesture");
        AppUser appUser = appUserService.getAppUser(userId);
        if (appUser == null || gestureName == null){
            map.put("status", 490);
            return new ResponseEntity<>(map, HttpStatus.OK);
        }

        if (gestureName.equals("weather")){
            appUserService.addWeatherGesture(appUser);
            map.put("status", 200);
        }
        else if (gestureName.equals("bus")){
            appUserService.addBusGesture(appUser);
            map.put("status", 200);
        }
        else if (gestureName.equals("todo")){
            appUserService.addTodoGesture(appUser);
            map.put("status", 200);
        }
        else if (gestureName.equals("news")){
            appUserService.addNewsGesture(appUser);
            map.put("status", 200);
        }
        else{
            map.put("status", 490);
            return new ResponseEntity<>(map, HttpStatus.OK);
        }


        return new ResponseEntity<>(map, HttpStatus.OK);
    }

}
