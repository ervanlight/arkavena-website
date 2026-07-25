import AppKit
import CoreGraphics
import ImageIO

let srcPath = "/Users/macbook/.gemini/antigravity/brain/ed915ff4-a0a8-467a-9a40-22348028c580/.user_uploaded/media__1784978811928.png"
let publicDir = "/Users/macbook/kontraktor-website/public"
let appDir = "/Users/macbook/kontraktor-website/src/app"

guard let image = NSImage(contentsOfFile: srcPath),
      let cgImage = image.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
    print("Failed to load image")
    exit(1)
}

let width = cgImage.width
let height = cgImage.height
print("Processing new favicon image dimensions: \(width) x \(height)")

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

var transparentData = rawData

for i in 0..<(width * height) {
    let offset = i * 4
    let r = Int(rawData[offset])
    let g = Int(rawData[offset + 1])
    let b = Int(rawData[offset + 2])
    
    // Background check (white / off-white > 210)
    if r > 210 && g > 210 && b > 210 {
        transparentData[offset + 3] = 0
    } else {
        // Keep original color & opacity
        transparentData[offset + 3] = 255
    }
}

func savePNG(data: inout [UInt8], w: Int, h: Int, toPath: String) {
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

savePNG(data: &transparentData, w: width, h: height, toPath: "\(publicDir)/favicon.ico")
savePNG(data: &transparentData, w: width, h: height, toPath: "\(publicDir)/apple-touch-icon.png")
savePNG(data: &transparentData, w: width, h: height, toPath: "\(publicDir)/logo-icon.png")
savePNG(data: &transparentData, w: width, h: height, toPath: "\(publicDir)/icon.png")
savePNG(data: &transparentData, w: width, h: height, toPath: "\(appDir)/favicon.ico")
savePNG(data: &transparentData, w: width, h: height, toPath: "\(appDir)/icon.png")
savePNG(data: &transparentData, w: width, h: height, toPath: "\(appDir)/apple-icon.png")
