from fastapi import APIRouter, HTTPException
from sqlmodel import select
from db import SessionDep
from backend.models.videos import Video   

videos = APIRouter(prefix="/videos", tags=["videos"])

@videos.post("/")
def create_video(video: Video, session: SessionDep):
    session.add(video)
    session.commit()
    session.refresh(video)
    return video

@videos.get("/")
def list_videos(session: SessionDep):
    videos_list = session.exec(select(Video)).all()
    return videos_list

@videos.get("/{video_id}")
def get_video(video_id: int, session: SessionDep):
    video = session.get(Video, video_id)
    if not video:
        raise HTTPException(status_code=404, detail="Video no encontrado")
    return video

@videos.delete("/{video_id}")
def delete_video(video_id: int, session: SessionDep):
    video = session.get(Video, video_id)
    if not video:
        raise HTTPException(status_code=404, detail="Video no encontrado")
    session.delete(video)
    session.commit()
    return {"ok": True}