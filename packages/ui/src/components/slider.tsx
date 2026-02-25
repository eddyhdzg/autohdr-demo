"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "@base-ui/react/slider"

import { cn } from "../lib/utils"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  tooltipRender,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root> & {
  tooltipRender?: (value: number) => React.ReactNode
}) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  )

  return (
    <SliderPrimitive.Root
      className={cn("w-full", className)}
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      {...props}
    >
      <SliderPrimitive.Control className="relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 py-3">
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="h-1 w-full rounded-none bg-muted-foreground/20 relative grow select-none"
        >
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className="rounded-none bg-primary select-none"
          />
          {Array.from({ length: _values.length }, (_, index) => (
            <SliderPrimitive.Thumb
              data-slot="slider-thumb"
              key={index}
              index={index}
              className={cn(
                "size-5 rounded-none bg-primary transition-[color,box-shadow] ring-ring/50 hover:ring-2 focus-visible:ring-2 focus-visible:outline-hidden active:ring-2 select-none disabled:pointer-events-none disabled:opacity-50 has-[:focus-visible]:ring-2",
                tooltipRender && "group"
              )}
            >
              {tooltipRender && (
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap bg-primary text-primary-foreground text-xs px-2 py-1 rounded-none opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 group-active:opacity-100 transition-opacity pointer-events-none">
                  {tooltipRender(_values[index])}
                </span>
              )}
            </SliderPrimitive.Thumb>
          ))}
        </SliderPrimitive.Track>
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { Slider }
