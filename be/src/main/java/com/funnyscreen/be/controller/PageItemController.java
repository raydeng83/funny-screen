package com.funnyscreen.be.controller;

import com.funnyscreen.be.model.PageItem;
import com.funnyscreen.be.service.PageItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/pageItem")
public class PageItemController {

    private final PageItemService pageItemService;

    @Autowired
    public PageItemController(PageItemService pageItemService) {
        this.pageItemService = pageItemService;
    }

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public List<PageItem> getUrlList() {
        return pageItemService.findAllPageItems();
    }

    @RequestMapping(value = "/list", method = RequestMethod.POST)
    public void setUrlList(@RequestBody List<String> urlList) {
        List<PageItem> pageItemList = new ArrayList<>();
        for (String url : urlList) {
            pageItemList.add(new PageItem(url));
        }

        pageItemService.savePageItems(pageItemList);
    }
}
