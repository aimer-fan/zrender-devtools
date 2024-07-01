import type { Arc, BezierCurve, Circle, Displayable, Droplet, Ellipse, Group, Heart, Image, Isogon, Line, Path, Polygon, Polyline, Rect, Rose, Sector, Star, Text, Trochoid } from 'zrender'
import type { CompoundPath } from 'zrender'

const types = [
  'group',

  'arc',
  'bezier-curve',
  'circle',
  'compound',
  'droplet',
  'ellipse',
  'heart',
  'image',
  'isogon',
  'line',
  'path',
  'polygon',
  'polyline',
  'rect',
  'rose',
  'sector',
  'star',
  'text',
  'trochoid',
] as const

export type ElementType = typeof types[number]
export type TargetType<T extends ElementType> = T extends 'group'
  ? Group
  : T extends 'arc'
    ? Arc
    : T extends 'bezier-curve'
      ? BezierCurve
      : T extends 'circle'
        ? Circle
        : T extends 'compound'
          ? CompoundPath
          : T extends 'droplet'
            ? Droplet
            : T extends 'ellipse'
              ? Ellipse
              : T extends 'heart'
                ? Heart
                : T extends 'image'
                  ? Image
                  : T extends 'isogon'
                    ? Isogon
                    : T extends 'line'
                      ? Line
                      : T extends 'path'
                        ? Path
                        : T extends 'polygon'
                          ? Polygon
                          : T extends 'polyline'
                            ? Polyline
                            : T extends 'rect'
                              ? Rect
                              : T extends 'rose'
                                ? Rose
                                : T extends 'sector'
                                  ? Sector
                                  : T extends 'star'
                                    ? Star
                                    : T extends 'text'
                                      ? Text
                                      : T extends 'trochoid'
                                        ? Trochoid
                                        : Displayable
