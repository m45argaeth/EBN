"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { Image as ImageIcon, AudioLines, Film } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImagesTab } from "./images-tab"
import { AudioTab } from "./audio-tab"
import { VideoTab } from "./video-tab"

const VALID = ["images", "audio", "video"] as const
type TabValue = (typeof VALID)[number]

export function PlaygroundTabs() {
  const params = useSearchParams()
  const initial = params.get("tab")
  const exampleId = params.get("example") ?? undefined
  const [value, setValue] = React.useState<TabValue>(
    VALID.includes(initial as TabValue) ? (initial as TabValue) : "images",
  )

  return (
    <Tabs
      value={value}
      onValueChange={(v) => setValue(v as TabValue)}
      className="w-full"
    >
      <div className="flex justify-center">
        <TabsList>
          <TabsTrigger value="images">
            <ImageIcon className="h-4 w-4" />
            Images
          </TabsTrigger>
          <TabsTrigger value="audio">
            <AudioLines className="h-4 w-4" />
            Audio
          </TabsTrigger>
          <TabsTrigger value="video">
            <Film className="h-4 w-4" />
            Video
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="images">
        <ImagesTab initialExampleId={value === "images" ? exampleId : undefined} />
      </TabsContent>
      <TabsContent value="audio">
        <AudioTab initialExampleId={value === "audio" ? exampleId : undefined} />
      </TabsContent>
      <TabsContent value="video">
        <VideoTab initialExampleId={value === "video" ? exampleId : undefined} />
      </TabsContent>
    </Tabs>
  )
}
