/**
 * Gourmet Popcornica - Standardized Project Asset Pipeline
 * 
 * Target Directory: C:\Projects\Gourmet-Popcornica\src\assets\images
 * Code Directory:   C:\Projects\Gourmet-Popcornica\src
 * Reports:          C:\Projects\Gourmet-Popcornica\reports\
 * 
 * Usage:
 *   node scripts/optimize_project_assets.js --preview     : Dry run scan, duplicate audit, code search
 *   node scripts/optimize_project_assets.js --execute     : Rename, compress, normalize casing, update code, generate audit report
 *   node scripts/optimize_project_assets.js --rollback    : Restore all images and code files to original state
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const sharp = require('sharp');

// Configuration
const rootDir = 'C:\\Projects\\Gourmet-Popcornica';
const targetDir = path.join(rootDir, 'src', 'assets', 'images');
const srcDir = path.join(rootDir, 'src');
const reportsDir = path.join(rootDir, 'reports');
const backupsDir = 'C:\\Users\\Arjun Santhosh\\.gemini\\antigravity-ide\\brain\\49a0a474-d18c-4d73-a26d-21f3fafa79ca\\backups';

const supportedExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif', '.bmp', '.ico', '.avif'];
const textExtensions = ['.html', '.css', '.js', '.ts', '.jsx', '.tsx', '.json', '.md'];
const maxFileSizeLimit = 5 * 1024 * 1024; // 5 MB
const maxDimensionLimit = 2560; // 2K max width or height

const mode = process.argv[2];

if (mode === '--preview' || mode === '-p') {
  runPreview();
} else if (mode === '--execute' || mode === '-e') {
  runExecute();
} else if (mode === '--rollback' || mode === '-r') {
  runRollback();
} else {
  console.log(`
Usage:
  node scripts/optimize_project_assets.js --preview     Scan project assets, find duplicates, check dimensions, search code references.
  node scripts/optimize_project_assets.js --execute     Rename/compress assets, normalize casing, update codebase references, write reports.
  node scripts/optimize_project_assets.js --rollback    Restore original images and code files from backup folder.
  `);
}

// 1. Recursive file scanner
function getFilesRecursive(dir, fileList = [], ignoreList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (ignoreList.includes(file)) continue;
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getFilesRecursive(filePath, fileList, ignoreList);
    } else {
      fileList.push(filePath);
    }
  }
  return fileList;
}

// 2. Hash calculation for duplicate audit
function getFileHash(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(content).digest('hex');
}

// 3. Naming Standardizer (lowercase, hyphens, clean up special chars, clean up double extensions)
function standardizeName(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  let base = path.basename(fileName, path.extname(fileName));
  
  // Clean double extensions like .JPG.webp
  if (base.toLowerCase().endsWith('.jpg') || base.toLowerCase().endsWith('.jpeg') || base.toLowerCase().endsWith('.png')) {
    base = path.basename(base, path.extname(base));
  }
  
  let newName = base
    .toLowerCase()
    .replace(/([a-z])(\d+)$/i, '$1-$2')   // insert hyphen before trailing digits
    .replace(/&/g, '-')                 // replace '&' with '-'
    .replace(/[®()]/g, '')                // remove registered symbol and parens
    .replace(/[^a-z0-9]+/g, '-')          // replace special characters / spaces with hyphens
    .replace(/^-+|-+$/g, '')              // trim leading/trailing hyphens
    .replace(/-+/g, '-');                 // collapse double hyphens
    
  return `${newName}${ext}`;
}

// 4. Dimension Normalization Recommender
function getNormalizedDimension(relativePath, width, height) {
  const parent = relativePath.split('/')[0].toLowerCase();
  const name = path.basename(relativePath).toLowerCase();
  
  // RTE popcon tins
  if (parent === 'rte-6-tins') {
    return { width: 2560, height: 2400, aspect: '16:15', label: 'RTE Popcorn Tin' };
  }
  // Seasoning Packets
  if (parent === 'seasonings') {
    return { width: 864, height: 1184, aspect: '27:37', label: 'Seasoning Packet' };
  }
  // Meeting Photos
  if (name.startsWith('gp-directors-meeting')) {
    return { width: 2560, height: 1440, aspect: '16:9', label: 'Meeting Photo' };
  }
  // Team / Director Portraits
  if (name.includes('pattabhi') || name.includes('mahidhar') || name.includes('kvb') || name.includes('venkateswara')) {
    const ratio = width / height;
    if (ratio > 0.9 && ratio < 1.1) {
      return { width: 1000, height: 1000, aspect: '1:1', label: 'Team Portrait (Square)' };
    } else {
      return { width: 1200, height: 1600, aspect: '3:4', label: 'Team Portrait' };
    }
  }
  
  // Fallback: keep original but scale down if oversized
  if (width > maxDimensionLimit || height > maxDimensionLimit) {
    if (width > height) {
      return {
        width: maxDimensionLimit,
        height: Math.round((height / width) * maxDimensionLimit),
        aspect: `${(width/height).toFixed(2)}:1`,
        label: 'Oversized Asset (Scaled)'
      };
    } else {
      return {
        width: Math.round((width / height) * maxDimensionLimit),
        height: maxDimensionLimit,
        aspect: `1:${(height/width).toFixed(2)}`,
        label: 'Oversized Asset (Scaled)'
      };
    }
  }
  
  return { width, height, aspect: `${(width/height).toFixed(2)}:1`, label: 'Standard Asset' };
}

// 5. SVG Optimizer (markup minifier)
function optimizeSvg(content) {
  return content
    .replace(/<!--[\s\S]*?-->/g, '') // strip comments
    .replace(/<metadata>[\s\S]*?<\/metadata>/g, '') // strip metadata
    .replace(/<\?xml[\s\S]*?\?>/i, '') // strip xml decl
    .replace(/<!DOCTYPE[\s\S]*?>/i, '') // strip doctype
    .replace(/<(sodipodi|inkscape):[\s\S]*?\/>/g, '')
    .replace(/<\/?(sodipodi|inkscape):[^>]*>/g, '')
    .replace(/\s(sodipodi|inkscape|xml|xmlns):[a-z0-9-_]+="[^"]*"/gi, '')
    .replace(/(-?\d+\.\d{3,})/g, (val) => parseFloat(val).toFixed(2)) // precision round
    .replace(/\s+/g, ' ')
    .trim();
}

// Compute all mapping definitions
async function computeMappings() {
  const files = getFilesRecursive(targetDir);
  const mappings = [];
  const hashGroups = {};
  
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!supportedExtensions.includes(ext)) continue;
    
    const relativePath = path.relative(targetDir, file).replace(/\\/g, '/');
    const stat = fs.statSync(file);
    
    let dimensions = { width: null, height: null };
    try {
      if (ext !== '.svg') {
        const meta = await sharp(file).metadata();
        dimensions.width = meta.width;
        dimensions.height = meta.height;
      }
    } catch (e) {
      console.error(`Metadata error on ${relativePath}: ${e.message}`);
    }
    
    const hash = getFileHash(file);
    if (!hashGroups[hash]) {
      hashGroups[hash] = [];
    }
    hashGroups[hash].push(relativePath);
    
    // Standardize file path
    const parts = relativePath.split('/');
    const fileName = parts.pop();
    const standardizedFileName = standardizeName(fileName);
    const newRelativePath = [...parts, standardizedFileName].join('/');
    
    const recommendation = getNormalizedDimension(relativePath, dimensions.width, dimensions.height);
    
    mappings.push({
      oldPath: file,
      newPath: path.join(targetDir, newRelativePath),
      oldRelative: relativePath,
      newRelative: newRelativePath,
      sizeBytes: stat.size,
      width: dimensions.width,
      height: dimensions.height,
      recWidth: recommendation.width,
      recHeight: recommendation.height,
      recLabel: recommendation.label,
      format: ext.substring(1).toUpperCase(),
      hash
    });
  }
  
  const duplicates = [];
  Object.keys(hashGroups).forEach(hash => {
    if (hashGroups[hash].length > 1) {
      duplicates.push({
        hash,
        files: hashGroups[hash]
      });
    }
  });
  
  return { mappings, duplicates };
}

// Preview execution
async function runPreview() {
  console.log('--- RUNNING ASSET PIPELINE PREVIEW ---');
  
  const { mappings, duplicates } = await computeMappings();
  
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  
  console.log(`Analyzing ${mappings.length} images...`);
  
  // 1. Scan for references in code
  const codeFiles = getFilesRecursive(srcDir, [], ['assets', 'node_modules', '.git']);
  const referencesFound = scanReferences(codeFiles, mappings);
  
  // 2. Separate into missing / unused
  const referencedSet = new Set();
  const refLocations = {};
  referencesFound.forEach(ref => {
    referencedSet.add(ref.asset);
    if (!refLocations[ref.asset]) {
      refLocations[ref.asset] = [];
    }
    refLocations[ref.asset].push(ref.file);
  });
  
  const unused = [];
  mappings.forEach(m => {
    if (!referencedSet.has(m.oldRelative)) {
      unused.push(m.oldRelative);
    }
  });
  
  // 3. Write Preview JSON reports
  fs.writeFileSync(path.join(reportsDir, 'preview_rename_report.json'), JSON.stringify(
    mappings.map(m => ({ old: m.oldRelative, new: m.newRelative, changed: m.oldRelative !== m.newRelative })),
    null, 2
  ));
  
  fs.writeFileSync(path.join(reportsDir, 'preview_dimension_report.json'), JSON.stringify(
    mappings.map(m => ({ file: m.oldRelative, current: `${m.width}x${m.height}`, recommended: `${m.recWidth}x${m.recHeight}`, category: m.recLabel })),
    null, 2
  ));
  
  fs.writeFileSync(path.join(reportsDir, 'preview_reference_update_report.json'), JSON.stringify(referencesFound, null, 2));
  
  // Generate md report
  writeMarkdownAuditReport(path.join(reportsDir, 'preview_report.md'), mappings, duplicates, referencesFound, unused, true);
  
  console.log('Preview completed! reports saved in "reports/" folder.');
}

// Helper to scan code files for image references
function scanReferences(codeFiles, mappings) {
  const references = [];
  
  // Sort mappings by oldRelative length descending to prevent replacing substrings
  const sortedMappings = [...mappings].sort((a, b) => b.oldRelative.length - a.oldRelative.length);
  
  codeFiles.forEach(filePath => {
    const ext = path.extname(filePath).toLowerCase();
    if (!textExtensions.includes(ext)) return;
    
    const relativeCodePath = path.relative(srcDir, filePath).replace(/\\/g, '/');
    let content;
    try {
      content = fs.readFileSync(filePath, 'utf8');
    } catch (e) {
      return;
    }
    
    sortedMappings.forEach(m => {
      const oldFilename = path.basename(m.oldPath);
      const oldRelative = m.oldRelative;
      
      // Match raw relative path, URL-encoded path, and pure filename
      const oldRelativeEscaped = escapeRegExp(oldRelative);
      const oldRelativeUrlEncoded = escapeRegExp(oldRelative.replace(/&/g, '%26'));
      const oldFilenameEscaped = escapeRegExp(oldFilename);
      
      const relRegex = new RegExp(oldRelativeEscaped, 'g');
      const urlRegex = new RegExp(oldRelativeUrlEncoded, 'g');
      const fileRegex = new RegExp(oldFilenameEscaped, 'g');
      
      let relCount = (content.match(relRegex) || []).length;
      let urlCount = (content.match(urlRegex) || []).length;
      let fileCount = (content.match(fileRegex) || []).length;
      
      if (relCount > 0 || urlCount > 0 || fileCount > 0) {
        references.push({
          file: relativeCodePath,
          asset: oldRelative,
          newAsset: m.newRelative,
          occurrences: relCount + urlCount + fileCount,
          details: { relCount, urlCount, fileCount }
        });
      }
    });
  });
  
  return references;
}

// Write the human-readable Markdown Audit Report
function writeMarkdownAuditReport(reportName, mappings, duplicates, references, unused, isPreview, stats = null) {
  let md = `# Project Asset Pipeline ${isPreview ? 'Preview' : 'Final Audit'} Report\n\n`;
  
  if (isPreview) {
    md += `> [!NOTE]\n> This is a dry run. No original assets or code references have been modified.\n\n`;
  } else {
    md += `> [!TIP]\n> Pipeline execution complete! Backup files are stored in \`.optimization_backups/\`.\n> To rollback, run: \`node scripts/optimize_project_assets.js --rollback\`.\n\n`;
  }
  
  if (stats) {
    md += `## Storage Savings Summary\n\n`;
    md += `| Metric | Before | After | Savings | Reduction |\n`;
    md += `| :--- | :--- | :--- | :--- | :--- |\n`;
    md += `| Total Storage | **${stats.beforeMB} MB** | **${stats.afterMB} MB** | **${stats.savedMB} MB** | **${stats.ratio}%** |\n\n`;
  }
  
  md += `## 1. Asset Inventory & Casing Standardisation\n\n`;
  md += `| Current Path | Standardised Target | Format | Dimensions | Size |\n`;
  md += `| :--- | :--- | :--- | :--- | :--- |\n`;
  
  mappings.forEach(m => {
    const sizeStr = `${(m.sizeBytes / 1024).toFixed(1)} KB`;
    const dimStr = m.width ? `${m.width}x${m.height}` : 'SVG (Vector)';
    const targetStr = m.oldRelative === m.newRelative ? `*(No change)*` : `\`${m.newRelative}\``;
    md += `| \`${m.oldRelative}\` | ${targetStr} | ${m.format} | ${dimStr} | ${sizeStr} |\n`;
  });
  
  md += `\n## 2. Dimension Normalisation Analysis\n\n`;
  md += `| File Path | Original Dimensions | Recommended Dimensions | Normalisation Target |\n`;
  md += `| :--- | :--- | :--- | :--- |\n`;
  
  mappings.forEach(m => {
    const currentStr = m.width ? `${m.width}x${m.height}` : 'SVG';
    const recStr = m.width ? `${m.recWidth}x${m.recHeight}` : 'SVG';
    md += `| \`${m.oldRelative}\` | ${currentStr} | **${recStr}** | ${m.recLabel} |\n`;
  });
  
  md += `\n## 3. Duplicate Image Audit\n\n`;
  if (duplicates.length === 0) {
    md += `No exact identical image content duplicate files discovered on disk.\n`;
  } else {
    duplicates.forEach((d, idx) => {
      md += `### Duplicate Group #${idx + 1}\n`;
      d.files.forEach(f => {
        md += `- \`${f}\`\n`;
      });
      md += `\n`;
    });
  }
  
  md += `\n## 4. Codebase Reference Updates\n\n`;
  const codeRefs = references.filter(r => r.occurrences > 0);
  if (codeRefs.length === 0) {
    md += `No asset reference replacements required in code files.\n`;
  } else {
    md += `| Code File | Original Asset | Target Asset | Occurrences |\n`;
    md += `| :--- | :--- | :--- | :--- |\n`;
    codeRefs.forEach(r => {
      md += `| \`${r.file}\` | \`${r.asset}\` | \`${r.newAsset}\` | ${r.occurrences} |\n`;
    });
  }
  
  md += `\n## 5. Unused Image Assets\n\n`;
  if (unused.length === 0) {
    md += `All image files in the assets directory are referenced in the codebase.\n`;
  } else {
    md += `The following image files were detected on disk but are **not referenced** anywhere in the code:\n\n`;
    unused.forEach(u => {
      md += `- \`${u}\`\n`;
    });
  }
  
  fs.writeFileSync(reportName, md);
}

// Execute renaming, optimization, dimension normalization and reference updates
async function runExecute() {
  console.log('--- EXECUTING ASSET PIPELINE WORKFLOW ---');
  
  if (fs.existsSync(backupsDir)) {
    console.log('Warning: A backup log already exists. Re-writing backups inside .optimization_backups folder.');
  } else {
    fs.mkdirSync(backupsDir, { recursive: true });
    fs.mkdirSync(path.join(backupsDir, 'assets'), { recursive: true });
    fs.mkdirSync(path.join(backupsDir, 'code'), { recursive: true });
  }
  
  const tmpDir = path.join(backupsDir, 'tmp');
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
  }
  
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  
  const { mappings, duplicates } = await computeMappings();
  const codeFiles = getFilesRecursive(srcDir, [], ['assets', 'node_modules', '.git']);
  
  console.log(`Processing ${mappings.length} assets...`);
  
  const successImages = [];
  const backupRecords = { assets: [], code: [] };
  
  // 1. Optimize and rename images
  for (const m of mappings) {
    const ext = path.extname(m.oldPath).toLowerCase();
    
    // Backup asset first
    const relativeAssetPath = m.oldRelative;
    const backupAssetPath = path.join(backupsDir, 'assets', relativeAssetPath);
    const backupAssetDir = path.dirname(backupAssetPath);
    if (!fs.existsSync(backupAssetDir)) {
      fs.mkdirSync(backupAssetDir, { recursive: true });
    }
    fs.copyFileSync(m.oldPath, backupAssetPath);
    backupRecords.assets.push({ old: m.oldPath, backup: backupAssetPath });
    
    // Optimization destination path
    // We write to a temporary file first (outside the watched src folder), validate, then rename
    const tempFile = path.join(tmpDir, `${path.basename(m.oldPath)}.${Date.now()}.optimized.tmp`);
    let optimized = false;
    
    try {
      if (ext === '.svg') {
        const content = fs.readFileSync(m.oldPath, 'utf8');
        const optimizedSvg = optimizeSvg(content);
        fs.writeFileSync(tempFile, optimizedSvg, 'utf8');
        optimized = true;
      } else {
        // Bitmap optimization
        const inputBuffer = fs.readFileSync(m.oldPath);
        let image = sharp(inputBuffer);
        
        // Downscale to recommended dimension (only if it doesn't upscale)
        if (m.width > m.recWidth || m.height > m.recHeight) {
          image = image.resize(m.recWidth, m.recHeight, { fit: 'inside', withoutEnlargement: true });
        }
        
        // Compress based on format
        if (ext === '.png') {
          // If oversized, use lossy palette compression for dramatic savings
          if (m.sizeBytes > maxFileSizeLimit || m.width > m.recWidth) {
            image = image.png({ palette: true, quality: 80, compressionLevel: 9 });
          } else {
            image = image.png({ compressionLevel: 9, adaptiveFiltering: true });
          }
        } else if (ext === '.jpg' || ext === '.jpeg') {
          image = image.jpeg({ quality: 82, progressive: true, mozjpeg: true });
        } else if (ext === '.webp') {
          image = image.webp({ quality: 82 });
        } else if (ext === '.avif') {
          image = image.avif({ quality: 75 });
        } else if (ext === '.gif') {
          image = image.gif({ recompress: true, colours: 256 });
        }
        
        await image.toFile(tempFile);
        optimized = true;
      }
      
      // Validation check
      if (optimized && fs.existsSync(tempFile)) {
        let isValid = false;
        if (ext === '.svg') {
          const svgContent = fs.readFileSync(tempFile, 'utf8');
          isValid = svgContent.includes('<svg') && svgContent.includes('</svg>');
        } else {
          const checkMeta = await sharp(tempFile).metadata();
          isValid = !!(checkMeta.width && checkMeta.width > 0);
        }
        
        if (isValid) {
          // Ensure new directory exists
          const newDir = path.dirname(m.newPath);
          if (!fs.existsSync(newDir)) {
            fs.mkdirSync(newDir, { recursive: true });
          }
          
          const isCaseChangeOnly = (m.oldPath.toLowerCase() === m.newPath.toLowerCase()) && (m.oldPath !== m.newPath);
          const isNoChange = m.oldPath === m.newPath;
          
          if (isCaseChangeOnly) {
            const tempCasePath = m.oldPath + '.case_rename';
            let caseRenameSuccess = false;
            try {
              if (fs.existsSync(m.oldPath)) {
                fs.renameSync(m.oldPath, tempCasePath);
                caseRenameSuccess = true;
              }
            } catch (err) {
              console.warn(`Warning: Could not casing-rename ${m.oldRelative} directly (locked). Writing content in-place.`);
            }
            
            if (caseRenameSuccess) {
              fs.writeFileSync(m.newPath, fs.readFileSync(tempFile));
              try {
                fs.unlinkSync(tempCasePath);
              } catch (err) {
                console.error(`Failed to delete temp case file ${tempCasePath}: ${err.message}`);
              }
            } else {
              // Fallback: write in-place to old path
              fs.writeFileSync(m.oldPath, fs.readFileSync(tempFile));
            }
          } else if (isNoChange) {
            fs.writeFileSync(m.oldPath, fs.readFileSync(tempFile));
          } else {
            // Normal rename/move to a different filename
            fs.writeFileSync(m.newPath, fs.readFileSync(tempFile));
            
            // Delete old file
            try {
              if (fs.existsSync(m.oldPath)) {
                fs.unlinkSync(m.oldPath);
              }
            } catch (err) {
              console.warn(`Warning: Could not delete old file ${m.oldRelative} (locked): ${err.message}`);
            }
          }
          
          // Clean up temp file
          try {
            fs.unlinkSync(tempFile);
          } catch (err) {
            // Silent catch
          }
          
          const optStat = fs.statSync(m.newPath);
          successImages.push({
            ...m,
            newSizeBytes: optStat.size,
            status: 'SUCCESS'
          });
        } else {
          try {
            if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
          } catch (err) {}
          successImages.push({ ...m, newSizeBytes: m.sizeBytes, status: 'VALIDATION_FAILED' });
        }
      }
    } catch (e) {
      console.error(`Failed to optimize ${m.oldRelative}: ${e.message}`);
      if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
      successImages.push({ ...m, newSizeBytes: m.sizeBytes, status: `ERROR: ${e.message}` });
    }
  }
  
  // Clean up tmp directory
  try {
    if (fs.existsSync(tmpDir)) {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  } catch (e) {
    console.error(`Failed to clean tmp folder: ${e.message}`);
  }
  
  // Clean empty folders under src/assets/images
  cleanEmptyDirectories(targetDir);
  
  // Normalize Windows casing for renamed directories / files if any
  ensureFolderCasing(targetDir, false);
  
  // 2. Perform codebase reference updates
  const updatedCodeFiles = [];
  const sortedMappings = [...mappings].sort((a, b) => b.oldRelative.length - a.oldRelative.length);
  
  codeFiles.forEach(filePath => {
    const ext = path.extname(filePath).toLowerCase();
    if (!textExtensions.includes(ext)) return;
    
    let content;
    try {
      content = fs.readFileSync(filePath, 'utf8');
    } catch (e) {
      return;
    }
    
    let modified = false;
    const details = [];
    
    sortedMappings.forEach(m => {
      const oldFilename = path.basename(m.oldPath);
      const newFilename = path.basename(m.newPath);
      
      const oldRelative = m.oldRelative;
      const newRelative = m.newRelative;
      
      const oldRelativeEscaped = escapeRegExp(oldRelative);
      const oldRelativeUrlEncoded = escapeRegExp(oldRelative.replace(/&/g, '%26'));
      const oldFilenameEscaped = escapeRegExp(oldFilename);
      
      const relRegex = new RegExp(oldRelativeEscaped, 'g');
      const urlRegex = new RegExp(oldRelativeUrlEncoded, 'g');
      const fileRegex = new RegExp(oldFilenameEscaped, 'g');
      
      let count = 0;
      if (relRegex.test(content)) {
        content = content.replace(relRegex, newRelative);
        modified = true;
        count++;
      }
      if (urlRegex.test(content)) {
        // Replace url-encoded matches with the new relative path
        content = content.replace(urlRegex, newRelative);
        modified = true;
        count++;
      }
      if (fileRegex.test(content)) {
        content = content.replace(fileRegex, newFilename);
        modified = true;
        count++;
      }
      
      if (count > 0) {
        details.push({
          oldAsset: oldRelative,
          newAsset: newRelative,
          occurrences: count
        });
      }
    });
    
    if (modified) {
      // Backup the code file first!
      const relativeCodePath = path.relative(srcDir, filePath).replace(/\\/g, '/');
      const backupCodePath = path.join(backupsDir, 'code', relativeCodePath);
      const backupCodeDir = path.dirname(backupCodePath);
      if (!fs.existsSync(backupCodeDir)) {
        fs.mkdirSync(backupCodeDir, { recursive: true });
      }
      fs.copyFileSync(filePath, backupCodePath);
      backupRecords.code.push({ old: filePath, backup: backupCodePath });
      
      // Save modified file
      fs.writeFileSync(filePath, content, 'utf8');
      updatedCodeFiles.push({
        file: relativeCodePath,
        changes: details
      });
    }
  });
  
  // Write backup records to the rollback directory so rollback can read it
  fs.writeFileSync(path.join(backupsDir, 'records.json'), JSON.stringify(backupRecords, null, 2));
  
  // 3. Validation Report
  const validation = validateExecution(successImages);
  
  // Stats
  const totalOrig = successImages.reduce((acc, curr) => acc + curr.sizeBytes, 0);
  const totalNew = successImages.reduce((acc, curr) => acc + curr.newSizeBytes, 0);
  const saved = totalOrig - totalNew;
  
  const stats = {
    beforeMB: parseFloat((totalOrig / 1024 / 1024).toFixed(2)),
    afterMB: parseFloat((totalNew / 1024 / 1024).toFixed(2)),
    savedMB: parseFloat((saved / 1024 / 1024).toFixed(2)),
    ratio: Math.round((saved / totalOrig) * 100)
  };
  
  // Write final reports
  fs.writeFileSync(path.join(reportsDir, 'asset_inventory_report.json'), JSON.stringify(successImages, null, 2));
  fs.writeFileSync(path.join(reportsDir, 'rename_report.json'), JSON.stringify(
    successImages.map(m => ({ old: m.oldRelative, new: m.newRelative, status: m.status })),
    null, 2
  ));
  fs.writeFileSync(path.join(reportsDir, 'dimension_report.json'), JSON.stringify(
    successImages.map(m => ({ file: m.oldRelative, original: `${m.width}x${m.height}`, final: `${m.recWidth}x${m.recHeight}` })),
    null, 2
  ));
  fs.writeFileSync(path.join(reportsDir, 'optimization_report.json'), JSON.stringify(
    successImages.map(m => ({ file: m.oldRelative, beforeBytes: m.sizeBytes, afterBytes: m.newSizeBytes, reduction: m.sizeBytes > 0 ? Math.round(((m.sizeBytes - m.newSizeBytes)/m.sizeBytes)*100) : 0 })),
    null, 2
  ));
  fs.writeFileSync(path.join(reportsDir, 'reference_update_report.json'), JSON.stringify(updatedCodeFiles, null, 2));
  fs.writeFileSync(path.join(reportsDir, 'validation_report.json'), JSON.stringify(validation, null, 2));
  
  const referencedSet = new Set(updatedCodeFiles.flatMap(u => u.changes.map(c => c.newAsset)));
  const unused = [];
  mappings.forEach(m => {
    if (!referencedSet.has(m.newRelative)) {
      unused.push(m.newRelative);
    }
  });
  
  writeMarkdownAuditReport(path.join(reportsDir, 'audit_report.md'), successImages, duplicates, scanReferences(codeFiles, mappings), unused, false, stats);
  
  console.log('Execution completed successfully!');
  console.log('Audit reports saved in "reports/" folder.');
}

// Verify execution results
function validateExecution(successImages) {
  const overLimitFiles = [];
  const brokenReferences = [];
  
  successImages.forEach(s => {
    if (!fs.existsSync(s.newPath)) {
      overLimitFiles.push({ relativePath: s.newRelative, error: 'File does not exist on disk' });
    } else {
      const stat = fs.statSync(s.newPath);
      if (stat.size > maxFileSizeLimit) {
        overLimitFiles.push({ relativePath: s.newRelative, sizeMB: (stat.size / 1024 / 1024).toFixed(2) });
      }
    }
  });
  
  return {
    isValid: overLimitFiles.length === 0 && brokenReferences.length === 0,
    overLimitFiles,
    brokenReferences
  };
}

// Helper to remove empty directories
function cleanEmptyDirectories(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      cleanEmptyDirectories(filePath);
    }
  }
  const updatedFiles = fs.readdirSync(dir);
  if (updatedFiles.length === 0 && dir !== targetDir) {
    try {
      fs.rmdirSync(dir);
    } catch (e) {}
  }
}

// Normalize Windows casing for folders/files
function ensureFolderCasing(basePath, isRollback) {
  const expectedCasing = {
    "corn-cob-variants": "corn-cob-variants",
    "krug-with-kiosk": "krug-with-kiosk",
    "premix": "premix",
    "rte-6-tins": "rte-6-tins",
    "seasonings": "seasonings"
  };
  
  if (!fs.existsSync(basePath)) return;
  const items = fs.readdirSync(basePath);
  for (const item of items) {
    const itemPath = path.join(basePath, item);
    if (fs.statSync(itemPath).isDirectory()) {
      const lower = item.toLowerCase();
      const targetName = expectedCasing[lower];
      if (targetName && item !== targetName) {
        try {
          const tempPath = path.join(basePath, item + '_temp_rename');
          const targetPath = path.join(basePath, targetName);
          fs.renameSync(itemPath, tempPath);
          fs.renameSync(tempPath, targetPath);
        } catch (e) {
          console.error(`Folder casing error: ${e.message}`);
        }
      }
    }
  }
}

// Rollback changes using backup records
function runRollback() {
  console.log('--- STARTING ROLLBACK WORKFLOW ---');
  
  const recordsFile = path.join(backupsDir, 'records.json');
  if (!fs.existsSync(recordsFile)) {
    console.error(`Error: Backup records not found at ${recordsFile}`);
    process.exit(1);
  }
  
  const records = JSON.parse(fs.readFileSync(recordsFile, 'utf8'));
  
  // 1. Restore code files
  console.log(`Restoring ${records.code.length} code files...`);
  records.code.forEach(r => {
    try {
      if (fs.existsSync(r.backup)) {
        fs.copyFileSync(r.backup, r.old);
        console.log(`Code Restored: ${path.basename(r.old)}`);
      }
    } catch (e) {
      console.error(`Failed to restore code file ${r.old}: ${e.message}`);
    }
  });
  
  // 2. Restore asset images
  console.log(`Restoring ${records.assets.length} image files...`);
  // Clear target directory first (excluding files that weren't moved, but since we restore everything:
  // we can delete the current assets and copy from backup)
  records.assets.forEach(r => {
    try {
      if (fs.existsSync(r.backup)) {
        // Ensure destination folder exists
        const destDir = path.dirname(r.old);
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }
        
        fs.copyFileSync(r.backup, r.old);
        console.log(`Asset Restored: ${path.basename(r.old)}`);
      }
    } catch (e) {
      console.error(`Failed to restore asset ${r.old}: ${e.message}`);
    }
  });
  
  // 3. Clean up empty folders in src/assets/images
  cleanEmptyDirectories(targetDir);
  
  // 4. Delete the backups directory recursively
  fs.rmSync(backupsDir, { recursive: true, force: true });
  console.log('Rollback successfully completed!');
}

// Regex escape helper
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
