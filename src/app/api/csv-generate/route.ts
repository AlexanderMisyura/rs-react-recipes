import config from '@config/app.config';
import { recipeSchema } from '@schemas';
import { convertRecipesToCSV } from '@utils';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function POST(req: NextRequest) {
  try {
    const requestBody: unknown = await req.json();
    const parsed = z
      .object({ recipes: z.array(recipeSchema), fileName: z.string() })
      .safeParse(requestBody);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Wrong data format' }, { status: 400 });
    }

    const { recipes, fileName } = parsed.data;

    const recipesCSVString = convertRecipesToCSV(recipes);

    return new NextResponse(recipesCSVString, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv;',
        'Content-Disposition': `attachment; filename="${config.DATA_PREFIX}${fileName}.csv"`,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: `An error occurred: ${error.message}` }, { status: 500 });
    }
  }
}
