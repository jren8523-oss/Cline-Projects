#!/usr/bin/env python3
"""
update_gallery.py - 自动扫描图片并更新 gallery-data.js 文件

功能：
1. 扫描 assets/images/ 目录下的所有子文件夹
2. 识别每个文件夹内的 .png 和 .jpg 文件
3. 将文件路径格式化为 JSON 结构
4. 将生成的 JSON 写入 gallery-data.js 文件
"""

import os
import json
import sys
from pathlib import Path

def scan_image_folders(base_path="assets/images"):
    """
    扫描指定目录下的所有子文件夹，收集图片文件
    
    Args:
        base_path: 图片目录的根路径
        
    Returns:
        dict: 包含文件夹名到图片路径列表的字典
    """
    image_data = {}
    
    # 确保目录存在
    if not os.path.exists(base_path):
        print(f"错误: 目录 '{base_path}' 不存在")
        return image_data
    
    # 扫描所有子文件夹
    for item in os.listdir(base_path):
        folder_path = os.path.join(base_path, item)
        
        # 只处理文件夹
        if os.path.isdir(folder_path):
            folder_name = item
            image_files = []
            
            # 扫描文件夹内的图片文件
            for file in os.listdir(folder_path):
                file_path = os.path.join(folder_path, file)
                
                # 只处理文件（非目录）
                if os.path.isfile(file_path):
                    # 检查文件扩展名
                    if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                        # 使用相对于项目根目录的路径
                        relative_path = file_path.replace('\\', '/')
                        image_files.append(relative_path)
            
            # 按文件名排序，确保顺序一致
            image_files.sort()
            
            # 如果有图片文件，添加到数据中
            if image_files:
                image_data[folder_name] = image_files
                print(f"找到文件夹 '{folder_name}': {len(image_files)} 张图片")
            else:
                print(f"警告: 文件夹 '{folder_name}' 中没有找到图片文件")
    
    return image_data

def generate_js_content(image_data):
    """
    生成 gallery-data.js 文件内容
    
    Args:
        image_data: 包含图片数据的字典
        
    Returns:
        str: 生成的 JavaScript 内容
    """
    # 将数据格式化为 JSON，确保缩进为4个空格
    json_str = json.dumps(image_data, indent=4, ensure_ascii=False)
    
    # 生成 JavaScript 内容
    js_content = f"""window.albumData = {json_str};"""
    
    return js_content

def write_gallery_data(js_content, output_file="gallery-data.js"):
    """
    将生成的 JavaScript 内容写入文件
    
    Args:
        js_content: JavaScript 内容
        output_file: 输出文件路径
    """
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(js_content)
        print(f"成功: 已更新 {output_file}")
        return True
    except Exception as e:
        print(f"错误: 写入文件失败 - {e}")
        return False

def main():
    """主函数"""
    print("开始扫描图片文件...")
    
    # 扫描图片文件夹
    image_data = scan_image_folders()
    
    if not image_data:
        print("错误: 没有找到任何图片文件")
        return 1
    
    print(f"\n扫描完成，共找到 {len(image_data)} 个文件夹的图片")
    
    # 生成 JavaScript 内容
    js_content = generate_js_content(image_data)
    
    # 写入文件
    if write_gallery_data(js_content):
        print("\n更新完成！")
        print("生成的 gallery-data.js 内容预览:")
        print("-" * 50)
        print(js_content[:500] + "..." if len(js_content) > 500 else js_content)
        print("-" * 50)
        return 0
    else:
        return 1

if __name__ == "__main__":
    sys.exit(main())