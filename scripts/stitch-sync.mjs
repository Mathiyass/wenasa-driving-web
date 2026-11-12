#!/usr/bin/env node

/**
 * Google Stitch Design System Synchronization Tool
 * Synchronizes design tokens, project metadata, and generated screens from Google Stitch
 * Project: Wenasa Driving School - Award Winning UI (ID: 11374186631473338108)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getStitchApiKey() {
  if (process.env.STITCH_API_KEY) return process.env.STITCH_API_KEY;
  try {
    const userProfile = process.env.USERPROFILE || process.env.HOME || "";
    const mcpConfigPath = path.join(userProfile, ".gemini", "config", "mcp_config.json");
    if (fs.existsSync(mcpConfigPath)) {
      const cfg = JSON.parse(fs.readFileSync(mcpConfigPath, "utf8"));
      const key = cfg.mcpServers?.["google-stitch"]?.env?.STITCH_API_KEY;
      if (key) return key;
    }
  } catch {
    // Fallback if unable to read local configuration
  }
  return "";
}

const STITCH_PROJECT_ID = process.env.STITCH_PROJECT_ID || "projects/11374186631473338108";
const STITCH_API_KEY = getStitchApiKey();

async function main() {
  console.log('[Stitch Sync] Initializing connection to Google Stitch API...');
  
  // Output directory in public/stitch
  const outputDir = path.join(__dirname, '..', 'public', 'stitch');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    let StitchToolClient;
    try {
      const sdk = await import('@google/stitch-sdk');
      StitchToolClient = sdk.StitchToolClient;
    } catch {
      // Fallback to scratch install if local node_modules doesn't have it yet
      const fallbackPath = 'C:/Users/MATHIYA/.gemini/antigravity-cli/brain/290ac69a-37d1-4e55-836b-9d4e5ce6183d/scratch/node_modules/@google/stitch-sdk/dist/src/client.js';
      if (fs.existsSync(fallbackPath)) {
        const sdk = await import('file:///' + fallbackPath.replace(/\\/g, '/'));
        StitchToolClient = sdk.StitchToolClient;
      }
    }

    if (!StitchToolClient) {
      console.warn('[Stitch Sync] @google/stitch-sdk not found, using cached design tokens.');
      return;
    }

    if (!STITCH_API_KEY) {
      console.warn('[Stitch Sync] STITCH_API_KEY environment variable is not set. Using cached design tokens.');
      return;
    }

    const client = new StitchToolClient({ apiKey: STITCH_API_KEY });
    console.log(`[Stitch Sync] Fetching project details for: ${STITCH_PROJECT_ID}`);
    const project = await client.callTool('get_project', { name: STITCH_PROJECT_ID });

    if (project) {
      console.log(`[Stitch Sync] Connected: "${project.title}" (${project.projectType})`);
      
      const themeData = {
        projectId: STITCH_PROJECT_ID,
        title: project.title,
        updatedAt: project.updateTime || new Date().toISOString(),
        designTheme: project.designTheme || null,
        thumbnail: project.thumbnailScreenshot?.downloadUrl || null,
      };

      const themeFilePath = path.join(outputDir, 'design-theme.json');
      fs.writeFileSync(themeFilePath, JSON.stringify(themeData, null, 2), 'utf8');
      console.log(`[Stitch Sync] ✔ Successfully written design tokens to: ${themeFilePath}`);
    }
  } catch (err) {
    console.error('[Stitch Sync] Error synchronizing with Google Stitch:', err.message || err);
  }
}

main();
