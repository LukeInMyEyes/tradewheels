import { parseStringPromise } from 'xml2js';
import { Vehicle, VehicleImage } from './types';

const FEED_URL = process.env.STOCK_FEED_URL!;

interface XmlImageAttrs {
  ThumbnailUrl?: string;
  FullImageUrl?: string;
  Priority?: string;
}

interface XmlImage {
  $: XmlImageAttrs;
}

function parseImages(imagesNode: unknown): VehicleImage[] {
  if (!imagesNode) return [];
  const raw = imagesNode as { Image?: XmlImage[] | XmlImage };
  if (!raw.Image) return [];
  const images: XmlImage[] = Array.isArray(raw.Image) ? raw.Image : [raw.Image];
  return images
    .map((img) => ({
      thumbnailUrl: img.$?.ThumbnailUrl || '',
      fullImageUrl: img.$?.FullImageUrl || '',
      priority: parseInt(img.$?.Priority || '99', 10),
    }))
    .filter((img) => img.fullImageUrl)
    .sort((a, b) => a.priority - b.priority);
}

function getText(node: unknown): string {
  if (!node) return '';
  if (Array.isArray(node)) return String(node[0] || '');
  return String(node);
}

function parseVehicle(raw: Record<string, unknown>): Vehicle {
  const make = getText(raw.MMMake) || getText(raw.VehicleMake);
  const model = getText(raw.MMModel) || getText(raw.VehicleModel);
  const derivative = getText(raw.MMDerivative);
  const fullModel = getText(raw.VehicleModel);

  return {
    stockNumber: getText(raw.StockNumber),
    dealershipId: getText(raw.DealershipID),
    department: getText(raw.Department),
    dateInStock: getText(raw.DateInStock),
    make,
    model,
    derivative,
    fullTitle: `${make} ${fullModel}`.trim() || `${make} ${model} ${derivative}`.trim(),
    category: getText(raw.VehicleCategory),
    year: parseInt(getText(raw.VehicleYear), 10) || 0,
    colour: getText(raw.VehicleColour),
    mileage: parseInt(getText(raw.VehicleMileage), 10) || 0,
    transmission: getText(raw.Transmission),
    drivetrain: getText(raw.Drivetrain),
    priceExcl: parseFloat(getText(raw.VehicleRetailPriceExcl)) || 0,
    priceIncl: parseFloat(getText(raw.VehicleRetailPriceIncl)) || 0,
    serviceHistory: getText(raw.VehicleFullServiceHistory),
    condition: getText(raw.Condition),
    comments: getText(raw.VehicleComments),
    extras: getText(raw.VehicleExtras)
      ? getText(raw.VehicleExtras)
          .split(',')
          .map((e) => e.trim())
          .filter(Boolean)
      : [],
    images: parseImages(Array.isArray(raw.Images) ? raw.Images[0] : raw.Images),
    vin: getText(raw.VehicleVIN),
    regNo: getText(raw.VehicleRegNo),
    engineNo: getText(raw.VehicleEngine),
    mmCode: getText(raw.VehicleMMCode),
  };
}

export async function getVehicles(): Promise<Vehicle[]> {
  const res = await fetch(FEED_URL, { next: { revalidate: 900 } });
  const xml = await res.text();
  const parsed = await parseStringPromise(xml, { explicitArray: false });
  const root = parsed.SpecialsVehicles || parsed.StockFeedVehicles || parsed;
  let items = root.StockFeedVehicle;
  if (!items) return [];
  if (!Array.isArray(items)) items = [items];
  return (items as Record<string, unknown>[])
    .map(parseVehicle)
    .filter((v) => v.priceIncl > 0 && v.images.length > 0);
}

export async function getVehicleByStock(stockNumber: string): Promise<Vehicle | undefined> {
  const vehicles = await getVehicles();
  return vehicles.find((v) => v.stockNumber === stockNumber);
}
