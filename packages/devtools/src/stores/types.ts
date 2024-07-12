import type {
  CompoundPath, Arc, BezierCurve, Circle, Droplet, Ellipse, Heart, Image, Isogon,
  Line, Path, Polygon, Polyline, Rect, Rose, Sector, Star, Text, Trochoid, Group,
} from 'zrender'

type TreeItemBase = { id: number; isGroup?: boolean; children?: TreeItem[] }
export type TreeItem = ({ type: 'group'; target: Group } & TreeItemBase)
| ({ type: 'arc'; target: Arc } & TreeItemBase)
| ({ type: 'bezier-curve'; target: BezierCurve } & TreeItemBase)
| ({ type: 'circle'; target: Circle } & TreeItemBase)
| ({ type: 'compound'; target: CompoundPath } & TreeItemBase)
| ({ type: 'droplet'; target: Droplet } & TreeItemBase)
| ({ type: 'ellipse'; target: Ellipse } & TreeItemBase)
| ({ type: 'heart'; target: Heart } & TreeItemBase)
| ({ type: 'image'; target: Image } & TreeItemBase)
| ({ type: 'isogon'; target: Isogon } & TreeItemBase)
| ({ type: 'line'; target: Line } & TreeItemBase)
| ({ type: 'path'; target: Path } & TreeItemBase)
| ({ type: 'polygon'; target: Polygon } & TreeItemBase)
| ({ type: 'polyline'; target: Polyline } & TreeItemBase)
| ({ type: 'rect'; target: Rect } & TreeItemBase)
| ({ type: 'rose'; target: Rose } & TreeItemBase)
| ({ type: 'sector'; target: Sector } & TreeItemBase)
| ({ type: 'star'; target: Star } & TreeItemBase)
| ({ type: 'text'; target: Text } & TreeItemBase)
| ({ type: 'trochoid'; target: Trochoid } & TreeItemBase)
