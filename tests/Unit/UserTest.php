<?php

namespace Tests\Unit;

use App\Room;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;


    /** @test */

    public function it_can_add_new_room()
    {
        $this->withoutExceptionHandling();
        $user = $this->signIn();

        $user->addRoom('new room');

        $this->assertDatabaseHas('rooms' , ['name' => 'new room']);
    }

    /** @test */

    public function it_can_invite_a_member()
    {
        $this->withoutExceptionHandling();
        $me = $this->signIn();
        $user = factory(User::class)->create();
        $room = factory(Room::class)->create(['user_id' => $me->id]);
        $me->inviteMember($user, $room);
        $this->assertTrue($room->members->contains($user));
    }

}
