import generatePDF from '@/utils/generatePDF';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { filename, directory = 'content/cheatsheets' } = await req.json() as { filename: string; directory?: string };

  if (!filename || typeof filename !== 'string') {
    return NextResponse.json({
      error: 'Invalid filename provided. Please provide a valid filename.'
    }, { status: 400 });
  }

  try {
    const pdfBuffer = await generatePDF(filename, directory as string);

    if (!pdfBuffer) {
      return NextResponse.json({
        error: 'Failed to generate PDF. Please check the filename and try again.'
      }, { status: 500 });
    }
    // set the response headers for PDF download
    const headers = new Headers();
    headers.set('Content-Type', 'application/pdf');
    headers.set('Content-Disposition', `attachment; filename=${filename}.pdf`);
    headers.set('Content-Length', pdfBuffer.length.toString());
    headers.set('Cache-Control', 'no-cache, no-store, must-revalidate'); // Prevent caching
    // Send the PDF
    return new NextResponse(pdfBuffer, { headers });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json({
      error: 'An error occurred while generating the PDF. Please try again later.'
    }, { status: 500 });
  }
}