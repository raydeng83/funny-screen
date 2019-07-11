package com.funnyscreen.be.controller;

import com.funnyscreen.be.model.PageItem;
import com.funnyscreen.be.service.PageItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/pageItem")
public class PageItemController {

    private final PageItemService pageItemService;

    @Autowired
    public PageItemController(PageItemService pageItemService) {
        this.pageItemService = pageItemService;
    }

    @RequestMapping("/list")
    public List<PageItem> findAllPageItems() {
        return pageItemService.findAllPageItems();
    }
}
