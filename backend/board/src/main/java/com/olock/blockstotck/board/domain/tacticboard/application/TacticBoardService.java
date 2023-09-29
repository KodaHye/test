package com.olock.blockstotck.board.domain.tacticboard.application;

import com.olock.blockstotck.board.domain.tacticboard.dto.request.TacticPostRequest;
import com.olock.blockstotck.board.domain.tacticboard.dto.response.TacticPostCommentResponse;
import com.olock.blockstotck.board.domain.tacticboard.dto.response.TacticPostResponse;

import java.util.List;

public interface TacticBoardService {
    void writeTacticPost(Long memberId, TacticPostRequest tacticBoardReqDto);
    List<TacticPostResponse> getTacticPostList();
    void likeTacticPost(Long memberId, Long tacticPostId);
    void unLikeTacticPost(Long memberId, Long tacticPostId);
    TacticPostResponse getTacticPost();
    void deleteTacticPost(Long tacticBoardId);
    void updateHit(Long tacticBoardId);
    List<TacticPostCommentResponse> getTacticPostCommentList();
    void writeTacticPostComment(Long memberId, Long tacticPostId);
    void deleteTacticPostComment(Long memberId, Long tacticPostId);
}
