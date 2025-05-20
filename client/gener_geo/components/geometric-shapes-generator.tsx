"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function GeometricShapesGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [sides, setSides] = useState(5)
  const [repetitions, setRepetitions] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [size, setSize] = useState(100)
  const [color, setColor] = useState("#6366f1")
  const [backgroundColor, setBackgroundColor] = useState("#ffffff")

  useEffect(() => {
    drawShape()
  }, [sides, repetitions, rotation, size, color, backgroundColor])

  const drawShape = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    // Draw each repetition
    for (let rep = 0; rep < repetitions; rep++) {
      const repRotation = (rep * rotation * Math.PI) / 180
      const repSize = size - rep * (size / (repetitions * 2))

      ctx.beginPath()
      ctx.fillStyle = color

      // Calculate points for the polygon
      for (let i = 0; i < sides; i++) {
        const angle = repRotation + (i * 2 * Math.PI) / sides
        const x = centerX + repSize * Math.cos(angle)
        const y = centerY + repSize * Math.sin(angle)

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.closePath()
      ctx.fill()
      ctx.strokeStyle = "rgba(0, 0, 0, 0.2)"
      ctx.lineWidth = 1
      ctx.stroke()
    }
  }

  const handleExport = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement("a")
    link.download = "forme-geometrique.png"
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  const handleRandomize = () => {
    setSides(Math.floor(Math.random() * 10) + 3)
    setRepetitions(Math.floor(Math.random() * 10) + 1)
    setRotation(Math.floor(Math.random() * 360))
    setSize(Math.floor(Math.random() * 150) + 50)
    setColor(
      `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`,
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-2">
        <CardContent className="p-6">
          <div className="flex justify-center items-center bg-gray-50 rounded-lg p-4">
            <canvas ref={canvasRef} width={500} height={500} className="border border-gray-200 rounded-md shadow-sm" />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Paramètres</TabsTrigger>
            <TabsTrigger value="advanced">Avancé</TabsTrigger>
          </TabsList>
          <TabsContent value="basic" className="space-y-4 pt-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="sides">Nombre de côtés: {sides}</Label>
              </div>
              <Slider
                id="sides"
                min={3}
                max={20}
                step={1}
                value={[sides]}
                onValueChange={(value) => setSides(value[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="repetitions">Répétitions: {repetitions}</Label>
              </div>
              <Slider
                id="repetitions"
                min={1}
                max={20}
                step={1}
                value={[repetitions]}
                onValueChange={(value) => setRepetitions(value[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="rotation">Angle de rotation: {rotation}°</Label>
              </div>
              <Slider
                id="rotation"
                min={0}
                max={360}
                step={1}
                value={[rotation]}
                onValueChange={(value) => setRotation(value[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="size">Taille: {size}px</Label>
              </div>
              <Slider
                id="size"
                min={10}
                max={250}
                step={1}
                value={[size]}
                onValueChange={(value) => setSize(value[0])}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Couleur</Label>
              <div className="flex gap-2">
                <div className="w-10 h-10 rounded-md border border-gray-200" style={{ backgroundColor: color }} />
                <Input
                  id="color"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full h-10"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="backgroundColor">Couleur de fond</Label>
              <div className="flex gap-2">
                <div
                  className="w-10 h-10 rounded-md border border-gray-200"
                  style={{ backgroundColor: backgroundColor }}
                />
                <Input
                  id="backgroundColor"
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-full h-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sidesInput">Nombre de côtés (précis)</Label>
              <Input
                id="sidesInput"
                type="number"
                min={3}
                max={100}
                value={sides}
                onChange={(e) => setSides(Number.parseInt(e.target.value) || 3)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="repetitionsInput">Répétitions (précis)</Label>
              <Input
                id="repetitionsInput"
                type="number"
                min={1}
                max={50}
                value={repetitions}
                onChange={(e) => setRepetitions(Number.parseInt(e.target.value) || 1)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rotationInput">Angle de rotation (précis)</Label>
              <Input
                id="rotationInput"
                type="number"
                min={0}
                max={360}
                value={rotation}
                onChange={(e) => setRotation(Number.parseInt(e.target.value) || 0)}
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2">
          <Button onClick={handleRandomize} className="flex-1">
            Aléatoire
          </Button>
          <Button onClick={handleExport} variant="outline" className="flex-1">
            Exporter PNG
          </Button>
        </div>
      </div>
    </div>
  )
}
