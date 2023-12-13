package com.dita.metapilot.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LikeDto {
    private long id;
    private long comment_tbl_id; // 수정된 필드명
    private String user_tbl_id; // 수정된 필드명

    public long getComment_tbl_id() {
        return comment_tbl_id;
    }

    public void setComment_tbl_id(long comment_tbl_id) {
        this.comment_tbl_id = comment_tbl_id;
    }

    public String getUser_tbl_id() {
        return user_tbl_id;
    }

    public void setUser_tbl_id(String user_tbl_id) {
        this.user_tbl_id = user_tbl_id;
    }
}
