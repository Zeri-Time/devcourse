package com.zt.framework.ioc;

public class ApplicationContext {
    private String basePackage;

    public ApplicationContext(String basePackage) {
        this.basePackage = basePackage;
    }

    public void init() {

    }

    public <T> T genBean(String beanName) {
        if (beanName.equals("testPostService")) {
            return (T) new TestPostService();
        }

        return null;
    }
}
