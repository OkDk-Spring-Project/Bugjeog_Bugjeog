package com.bugjeogbugjeog.app.bugjeogbugjeog.controller;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@SpringBootTest
@Slf4j
public class AdminControllerTest {

    @Autowired
    WebApplicationContext webApplicationContext;

    MockMvc mockMvc;

    @BeforeEach
    public void setup() { mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();}

    /* 공지사항 */
    @Test
    public void noticeListTest() throws Exception{
        log.info(mockMvc.perform(MockMvcRequestBuilders.get("/admin/admin-noticeList")).andReturn().getModelAndView().getModelMap().toString());
    }

    @Test
    public void noticeTest() throws Exception{
        log.info(mockMvc.perform(MockMvcRequestBuilders.get("/admin/admin-notice").param("noticeId","1")).andReturn().getModelAndView().getModelMap().toString());
    }

    @Test
    public void noticeWrite() throws Exception{
        log.info(mockMvc.perform(MockMvcRequestBuilders.get("/admin/admin-noticeWrite")).andReturn().getModelAndView().getModelMap().toString());
        log.info(mockMvc.perform(MockMvcRequestBuilders.post("/admin/admin-noticeWrite")
                .param("noticeTitle","공지사항5")
                .param("noticeContent","공지사항 내용5")
        ).andReturn().getModelAndView().getModelMap().toString());
    }

    @Test
    public void removeNotice() throws Exception{
        mockMvc.perform(MockMvcRequestBuilders.post("/admin/admin-noticeList")
                .param("noticeId","5")
        ).andExpect(MockMvcResultMatchers.status().is3xxRedirection());
    }
}