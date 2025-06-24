
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

interface CourseVideoPlayerProps {
  videoUrl: string;
  title: string;
}

export function CourseVideoPlayer({ videoUrl, title }: CourseVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    const video = document.getElementById('course-video') as HTMLVideoElement;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    const video = document.getElementById('course-video') as HTMLVideoElement;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    const video = document.getElementById('course-video') as HTMLVideoElement;
    if (video) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      }
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative group">
          <video
            id="course-video"
            className="w-full h-64 object-cover"
            src={videoUrl}
            poster={`https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop&crop=center`}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            Your browser does not support the video tag.
          </video>
          
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={togglePlay}
                className="gap-2"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isPlaying ? 'Pause' : 'Play'}
              </Button>
              <Button size="sm" variant="secondary" onClick={toggleMute}>
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              <Button size="sm" variant="secondary" onClick={toggleFullscreen}>
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-white text-sm font-medium bg-black/50 px-2 py-1 rounded">
              {title} - Course Preview
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
