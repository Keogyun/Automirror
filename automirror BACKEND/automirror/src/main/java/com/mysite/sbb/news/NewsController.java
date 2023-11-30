package com.mysite.sbb.news;

import com.mysite.sbb.appuser.AppUser;
import com.mysite.sbb.appuser.AppUserService;
import com.mysite.sbb.errorstat.ErrorStatService;
import com.mysite.sbb.requeststat.RequestStatService;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/news")
@RequiredArgsConstructor
public class NewsController {

    private final AppUserService appUserService;
    private final RequestStatService requestStatService;
    private final ErrorStatService errorStatService;

    private final String url = "https://newsapi.org/v2/top-headlines?country=kr";
    private String apiKey = "20b31624b667430ca8230fbdd8cf0e82";

    @PostMapping("/get")
    public ResponseEntity<Object> getNews(@RequestBody Map<String, String> userIdMap){
        String userId = userIdMap.get("userId");
        HashMap map = new HashMap<>();

        AppUser appUser = appUserService.findByUserId(userId);

        if(appUser == null){
            map.put("status", 490);
            errorStatService.increaseNewsCount(userId);
            return new ResponseEntity<>(map, HttpStatus.OK);
        }

        String urlstr = url + "&apiKey=" + apiKey;
        String line, result = "";

        try{
            URL url = new URL(urlstr);
            BufferedReader br = new BufferedReader(new InputStreamReader(url.openStream()));

            while((line=br.readLine()) != null){
                result=result.concat(line);
            }

            JSONObject jsonObject = new JSONObject(result);
            JSONArray articleArray = (JSONArray) jsonObject.get("articles");
            List<Object> articleList = articleArray.toList();
            map.put("status", 200);
            map.put("articles", articleList);
            requestStatService.increaseNewsCount(userId);

        } catch (Exception e){
            System.out.println(e);
            map.put("status", 490);
            errorStatService.increaseNewsCount(userId);
        }
        return new ResponseEntity<>(map, HttpStatus.OK);
    }
}
