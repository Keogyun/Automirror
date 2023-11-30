package com.mysite.sbb.device;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RequestMapping("/device")
@RequiredArgsConstructor
@Controller
public class DeviceContoller {
    private final DeviceService deviceService;

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/list")
    public String list(Model model, @RequestParam(value="page", defaultValue="0") int page,
                       @RequestParam(value = "kw", defaultValue = "") String kw){
        Page<Device> paging = this.deviceService.getList(page, kw);
        model.addAttribute("paging", paging);
        model.addAttribute("kw", kw);
        return "device_list";
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/create")
    public String deviceCreate() {
        return "device_form";
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/create")
    public String deviceCreate(@RequestParam String deviceId, @RequestParam String deviceAddress) {
        this.deviceService.create(deviceId, deviceAddress);
        return "redirect:/device/list";
    }

    @PostMapping("/find-url")
    public ResponseEntity<Object> findUrl(@RequestBody Map<String, String> deviceIdMap){
        String deviceId = deviceIdMap.get("deviceId");
        HashMap map = new HashMap<>();

        String deviceAddress = this.deviceService.findDeviceAddress(deviceId);
        if (deviceAddress == null || deviceAddress.equals("")){
            map.put("status", 490);
        }
        else {
            map.put("status", 200);
            map.put("deviceAddress", deviceAddress);
        }
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/delete/{id}")
    public String deviceDelete(@PathVariable("id") Long id){
        Device device = this.deviceService.getDevice(id);
        this.deviceService.delete(device);
        return "redirect:/device/list";
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping(value = "/modify/{deviceIndex}")
    public String modifyPage(Model model, @PathVariable("deviceIndex") Long deviceIndex){
        Device device = this.deviceService.getDevice(deviceIndex);
        model.addAttribute("device", device);
        return "device_modify";
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/modify")
    public String modifyDevice( Model model, DeviceModifyDto dto){
        Device device = deviceService.getDevice(dto.getDeviceIndex());
        this.deviceService.changeDeviceInfoWeb(device, dto);
        model.addAttribute("msg", "정보가 변경되었습니다.");
        return "device_modify :: #resultDiv";

    }

}
