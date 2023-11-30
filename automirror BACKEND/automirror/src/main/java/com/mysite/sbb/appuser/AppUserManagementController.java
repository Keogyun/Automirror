package com.mysite.sbb.appuser;

import com.mysite.sbb.errorstat.ErrorStat;
import com.mysite.sbb.errorstat.ErrorStatService;
import com.mysite.sbb.requeststat.RequestStat;
import com.mysite.sbb.requeststat.RequestStatService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/member")
@Controller
@RequiredArgsConstructor
public class AppUserManagementController {
    private final AppUserService appUserService;
    private final RequestStatService requestStatService;
    private final ErrorStatService errorStatService;

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/list")
    public String list(Model model, @RequestParam(value="page", defaultValue = "0") int page,
                       @RequestParam(value = "kw", defaultValue = "") String kw){
        Page<AppUser> paging = this.appUserService.getList(page, kw);
        model.addAttribute("paging", paging);
        model.addAttribute("kw", kw);
        return "app_user_list";
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/delete/{id}")
    public String appUserDelete(@PathVariable("id") Long id){
        AppUser appUser = this.appUserService.getAppUser(id);
        this.appUserService.deleteUser(appUser);
        return "redirect:/member/list";
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/modify/{id}")
    public String modifyPage(Model model, @PathVariable("id") Long id){
        AppUser appUser = this.appUserService.getAppUser(id);
        model.addAttribute("appUser", appUser);
        return "app_user_modify";
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/modify")
    public String modifyAppUser( Model model, AppUserModifyDto dto){
        AppUser appUser = appUserService.findByUserIndex(dto.getUserIndex());
        this.appUserService.changeUserInfoWeb(appUser, dto);
        model.addAttribute("msg", "정보가 변경되었습니다.");
        return "app_user_modify :: #resultDiv";
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/stat/{id}")
    public String stat(Model model, @PathVariable("id") Long id){
        AppUser appUser = this.appUserService.getAppUser(id);
        RequestStat requestStat = this.requestStatService.getRequestStat(id);
        ErrorStat errorStat = this.errorStatService.getErrorStat(id);
        model.addAttribute("appUser", appUser);
        model.addAttribute("requestStat", requestStat);
        model.addAttribute("errorStat", errorStat);
        return "app_user_stat";
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/service")
    public String statList(Model model, @RequestParam(value="page", defaultValue = "0") int page,
                       @RequestParam(value = "kw", defaultValue = "") String kw){
        Page<AppUser> paging = this.appUserService.getList(page, kw);
        model.addAttribute("paging", paging);
        model.addAttribute("kw", kw);
        return "service_stat";
    }
}
