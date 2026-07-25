import AppKit
import CoreGraphics
import ImageIO

let srcPath = "/Users/macbook/.gemini/antigravity/brain/ed915ff4-a0a8-467a-9a40-22348028c580/.user_uploaded/media__1784941313656.png"
let publicDir = "/Users/macbook/kontraktor-website/public"

guard let image = NSImage(contentsOfFile: srcPath),
      let cgImage = image.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
    print("Failed to load image")
    exit(1)
}

let width = cgImage.width
let height = cgImage.height

var rawData = [UInt8](repeating: 0, count: width * height * 4)
let colorSpace = CGColorSpaceCreateDeviceRGB()
guard let context = CGContext(
    data: &rawData,
    width: width,
    height: height,
    bitsPerComponent: 8,
    bytesPerRow: width * 4,
    space: colorSpace,
    bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue | CGBitmapInfo.byteOrder32Big.rawValue
) else {
    print("Failed to create context")
    exit(1)
}

context.draw(cgImage, in: CGRect(x: 0, y: 0, width: width, height: height))

// Find bounding boxes for:
// 1. Icon ('A' mark) -> top area
// 2. Wordmark ('ARKAVENA') -> middle area
// 3. Subtext ('ENGINEERING & CONSTRUCTION...') -> bottom area

var lightData = rawData
for i in 0..<(width * height) {
    let offset = i * 4
    let r = Int(rawData[offset])
    let g = Int(rawData[offset + 1])
    let b = Int(rawData[offset + 2])
    
    // Background check (> 210)
    if r > 210 && g > 210 && b > 210 {
        lightData[offset + 3] = 0
    } else {
        let isGold = (r > 130 && g > 90 && b < 110)
        if isGold {
            lightData[offset] = 226
            lightData[offset + 1] = 166
            lightData[offset + 2] = 60
            lightData[offset + 3] = 255
        } else {
            lightData[offset] = 255
            lightData[offset + 1] = 255
            lightData[offset + 2] = 255
            lightData[offset + 3] = 255
        }
    }
}

func saveImage(data: inout [UInt8], w: Int, h: Int, toPath: String) {
    guard let ctx = CGContext(
        data: &data,
        width: w,
        height: h,
        bitsPerComponent: 8,
        bytesPerRow: w * 4,
        space: colorSpace,
        bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue | CGBitmapInfo.byteOrder32Big.rawValue
    ), let outCG = ctx.makeImage() else { return }
    
    let url = URL(fileURLWithPath: toPath) as CFURL
    if let dest = CGImageDestinationCreateWithURL(url, kUTTypePNG, 1, nil) {
        CGImageDestinationAddImage(dest, outCG, nil)
        CGImageDestinationFinalize(dest)
        print("Saved: \(toPath)")
    }
}

saveImage(data: &lightData, w: width, h: height, toPath: "\(publicDir)/logo-full-light.png")

// Crop icon ('A' mark: upper half)
// In CGContext (0,0 is bottom-left):
// Wordmark 'ARKAVENA' is in lower middle, Icon 'A' is in upper middle
// Icon rect: x: 300..724, y: 460..940
let iconRect = CGRect(x: 300, y: 460, width: 424, height: 480)
if let iconCG = cgImage.cropping(to: iconRect) {
    var iconBytes = [UInt8](repeating: 0, count: 424 * 480 * 4)
    if let iconCtx = CGContext(data: &iconBytes, width: 424, height: 480, bitsPerComponent: 8, bytesPerRow: 424 * 4, space: colorSpace, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue | CGBitmapInfo.byteOrder32Big.rawValue) {
        iconCtx.draw(iconCG, in: CGRect(x: 0, y: 0, width: 424, height: 480))
        for i in 0..<(424 * 480) {
            let o = i * 4
            let r = Int(iconBytes[o]), g = Int(iconBytes[o+1]), b = Int(iconBytes[o+2])
            if r > 210 && g > 210 && b > 210 {
                iconBytes[o+3] = 0
            } else if r > 130 && g > 90 && b < 110 {
                iconBytes[o] = 226; iconBytes[o+1] = 166; iconBytes[o+2] = 60; iconBytes[o+3] = 255
            } else {
                iconBytes[o] = 255; iconBytes[o+1] = 255; iconBytes[o+2] = 255; iconBytes[o+3] = 255
            }
        }
        saveImage(data: &iconBytes, w: 424, h: 480, toPath: "\(publicDir)/logo-icon.png")
    }
}

// Crop Wordmark ('ARKAVENA' text + subtext: lower half)
// Wordmark rect: x: 50..974, y: 150..450
let markRect = CGRect(x: 50, y: 150, width: 924, height: 300)
if let markCG = cgImage.cropping(to: markRect) {
    var markBytes = [UInt8](repeating: 0, count: 924 * 300 * 4)
    if let markCtx = CGContext(data: &markBytes, width: 924, height: 300, bitsPerComponent: 8, bytesPerRow: 924 * 4, space: colorSpace, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue | CGBitmapInfo.byteOrder32Big.rawValue) {
        markCtx.draw(markCG, in: CGRect(x: 0, y: 0, width: 924, height: 300))
        for i in 0..<(924 * 300) {
            let o = i * 4
            let r = Int(markBytes[o]), g = Int(markBytes[o+1]), b = Int(markBytes[o+2])
            if r > 210 && g > 210 && b > 210 {
                markBytes[o+3] = 0
            } else if r > 130 && g > 90 && b < 110 {
                markBytes[o] = 226; markBytes[o+1] = 166; markBytes[o+2] = 60; markBytes[o+3] = 255
            } else {
                markBytes[o] = 255; markBytes[o+1] = 255; markBytes[o+2] = 255; markBytes[o+3] = 255
            }
        }
        saveImage(data: &markBytes, w: 924, h: 300, toPath: "\(publicDir)/logo-text.png")
    }
}
