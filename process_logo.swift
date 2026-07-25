import AppKit
import CoreGraphics
import ImageIO

let srcPath = "/Users/macbook/.gemini/antigravity/brain/ed915ff4-a0a8-467a-9a40-22348028c580/.user_uploaded/media__1784946506233.png"
let publicDir = "/Users/macbook/kontraktor-website/public"

guard let image = NSImage(contentsOfFile: srcPath),
      let cgImage = image.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
    print("Failed to load image")
    exit(1)
}

let width = cgImage.width
let height = cgImage.height
print("Processing correct logo crop dimensions: \(width) x \(height)")

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

var lightData = rawData
var darkData = rawData

for i in 0..<(width * height) {
    let offset = i * 4
    let r = Int(rawData[offset])
    let g = Int(rawData[offset + 1])
    let b = Int(rawData[offset + 2])
    
    // Background check (near white > 210)
    if r > 210 && g > 210 && b > 210 {
        lightData[offset + 3] = 0
        darkData[offset + 3] = 0
    } else {
        // Gold check (r > 130, g > 90, b < 110)
        let isGold = (r > 130 && g > 90 && b < 110)
        if isGold {
            // Gold accent: bright warm gold (#E2A63C)
            lightData[offset] = 226
            lightData[offset + 1] = 166
            lightData[offset + 2] = 60
            lightData[offset + 3] = 255
            
            darkData[offset] = 226
            darkData[offset + 1] = 166
            darkData[offset + 2] = 60
            darkData[offset + 3] = 255
        } else {
            // Navy text -> Pure white for lightData
            lightData[offset] = 255
            lightData[offset + 1] = 255
            lightData[offset + 2] = 255
            lightData[offset + 3] = 255
            
            // Dark navy for darkData
            darkData[offset] = 20
            darkData[offset + 1] = 23
            darkData[offset + 2] = 27
            darkData[offset + 3] = 255
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

saveImage(data: &lightData, w: width, h: height, toPath: "\(publicDir)/logo.png")
saveImage(data: &darkData, w: width, h: height, toPath: "\(publicDir)/logo-dark.png")

// Crop icon ('A' mark: upper 70% of crop)
// Dimensions in new image: width=964, height=576
// Icon 'A' is located in the upper portion
let iconRect = CGRect(x: Int(Double(width) * 0.28), y: Int(Double(height) * 0.22), width: Int(Double(width) * 0.44), height: Int(Double(height) * 0.72))

if let iconCG = cgImage.cropping(to: iconRect) {
    let iw = Int(iconRect.width)
    let ih = Int(iconRect.height)
    var iconBytes = [UInt8](repeating: 0, count: iw * ih * 4)
    if let iconCtx = CGContext(data: &iconBytes, width: iw, height: ih, bitsPerComponent: 8, bytesPerRow: iw * 4, space: colorSpace, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue | CGBitmapInfo.byteOrder32Big.rawValue) {
        iconCtx.draw(iconCG, in: CGRect(x: 0, y: 0, width: iw, height: ih))
        for i in 0..<(iw * ih) {
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
        saveImage(data: &iconBytes, w: iw, h: ih, toPath: "\(publicDir)/logo-icon.png")
        saveImage(data: &iconBytes, w: iw, h: ih, toPath: "\(publicDir)/apple-touch-icon.png")
        saveImage(data: &iconBytes, w: iw, h: ih, toPath: "\(publicDir)/favicon.ico")
    }
}
