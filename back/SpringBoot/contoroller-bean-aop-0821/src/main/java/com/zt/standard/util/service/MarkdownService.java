package com.zt.standard.util.service;

import org.commonmark.node.Node;
import org.commonmark.parser.Parser;
import org.commonmark.renderer.html.HtmlRenderer;
import org.springframework.stereotype.Service;

@Service
public class MarkdownService {
    private final HtmlRenderer htmlRenderer;
    private final Parser parser;

    public MarkdownService() {
        htmlRenderer = HtmlRenderer.builder().build();
        parser = Parser.builder().build();
    }

    public String toHtml(String markdown) {
        // 문자열을 파싱해서 Node 트리 구조로 변환
        Node document = parser.parse(markdown);

        // Node를 HTML 문자열로 렌더링
        return htmlRenderer.render(document);
    }
}
