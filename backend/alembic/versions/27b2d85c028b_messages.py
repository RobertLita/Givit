"""messages

Revision ID: 27b2d85c028b
Revises: f2e4c4d1f684
Create Date: 2023-06-14 22:29:57.797675

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '27b2d85c028b'
down_revision = 'f2e4c4d1f684'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('message',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('senderId', sa.Integer(), nullable=True),
    sa.Column('recipientId', sa.Integer(), nullable=True),
    sa.Column('content', sa.String(), nullable=True),
    sa.Column('timestamp', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_message_id'), 'message', ['id'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_message_id'), table_name='message')
    op.drop_table('message')
    # ### end Alembic commands ###